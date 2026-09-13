# NEXUS AI — System Architecture & RAG Technical Specification

**Version:** `v0.9.1`  
**Platform:** NEXUS AI — Document Intelligence Platform  

---

## 📐 1. System Overview

**NEXUS AI** is an enterprise-grade Retrieval-Augmented Generation (RAG) platform designed to transform complex engineering documents, research papers, and technical manuals into an instant, context-aware AI knowledge assistant. 

### Core Architectural Goals:
* **Strict Context Grounding**: Rely on vector similarity search with page-aware metadata to synthesize accurate answers and eliminate LLM hallucinations.
* **Page-Aware Citations**: Trace every generated response directly back to the exact source document title, chunk index, vector similarity score, and page number.
* **Pluggable Multi-LLM Inference Engine**: Support local privacy-first models (Ollama `llama3.2:3b`) as well as high-throughput cloud LPUs/APIs (Groq, OpenAI).
* **Real-Time Streaming**: Low-latency Server-Sent Events (SSE) token streaming with robust post-flush error handling.

---

## 🏗️ 2. High-Level Architecture

```
                                  ┌──────────────────────────────────┐
                                  │       React 19 Frontend          │
                                  │ (Vite, TypeScript, Tailwind v4,  │
                                  │   Redux Toolkit, Framer Motion)  │
                                  └────────────────┬─────────────────┘
                                                   │ HTTP / REST / SSE Stream
                                                   ▼
                                  ┌──────────────────────────────────┐
                                  │       Express 5 API Server       │
                                  │      (Node.js + TypeScript)      │
                                  └───────┬──────────────────┬───────┘
                                          │                  │
            ┌─────────────────────────────┴┐                 └──────────────────────────────┐
            │ Document Ingestion & RAG     │                                                │ DB Operations
            ▼                              ▼                                                ▼
┌───────────────────────────────┐ ┌──────────────────────────────────┐            ┌────────────────────┐
│  FastAPI Embedding Service    │ │    Pluggable LLM Engine System   │            │   MongoDB Atlas    │
│ (SentenceTransformers Py 3.10)│ │    (Ollama / Groq / OpenAI)      │            │ (Users, Docs,      │
└───────────┬───────────────────┘ └──────────────────────────────────┘            │  Chunks, Messages) │
            │ 384-dim Dense Vectors                                               └────────────────────┘
            ▼
┌───────────────────────────────┐
│     Pinecone Vector DB        │
│   (Cosine Similarity Index)   │
└───────────────────────────────┘
```

---

## 🔄 3. Component Details & Pipeline Workflows

### 📄 3.1 Document Ingestion Pipeline

```
[ PDF Upload ] ──► [ PDF.js Extraction ] ──► [ LangChain Chunking ] ──► [ Embedding Service ] ──► [ Pinecone & MongoDB ]
```

1. **File Upload**: Asynchronous multipart file upload (`pdf-parse` / `multer`) stored in local storage and registered in MongoDB with `uploaded` status.
2. **Page-Aware PDF Parsing**: Utilizes `pdfjs-dist/legacy/build/pdf.mjs` to iterate over document pages sequentially, extracting page-specific text lines and binding each text segment to its exact `pageNumber`.
3. **LangChain Semantic Chunking**: Employs `RecursiveCharacterTextSplitter` (chunk size: 1000, overlap: 200) to create contextual chunks while maintaining page mapping.
4. **Vector Embedding**: Sends chunks in batch to the Python FastAPI microservice (`/embed`) which computes 384-dimensional dense vectors using `sentence-transformers/all-MiniLM-L6-v2`.
5. **Dual Indexing**:
   - Upserts vectors into **Pinecone** with metadata payload: `{ documentId, documentTitle, ownerId, chunkIndex, pageNumber, content }`.
   - Saves chunk documents to **MongoDB Atlas** with status set to `indexed`.

---

### 🔍 3.2 Page-Aware RAG Retrieval & Prompt Engineering

1. **Question Vectorization**: Converts incoming user query into a 384-dim dense embedding.
2. **Pinecone Similarity Query**: Performs cosine similarity lookup against Pinecone filtered by `ownerId` (`topK = 5`).
3. **Metadata Filtering**: Filters out matches with missing or null metadata attributes (`documentId`, `documentTitle`, `pageNumber`), preventing `NaN` casting errors.
4. **Threshold Evaluation**: Checks if `bestScore >= config.RAG_THRESHOLD`.
   - If true: Sets `responseType = "rag"`, constructs context-bound prompt via `buildRAGPrompt()`.
   - If false: Sets `responseType = "general"`, fallback to general knowledge via `buildGeneralPrompt()`.
5. **Prompt Directives**: Instructs LLM to answer directly, naturally, and naturally integrate citations without stating meta-phrases such as "Based on the provided text".

---

### ⚡ 3.3 Server-Sent Events (SSE) Streaming Pipeline

```
Client Request ──► Flush Headers ──► Start Event ──► Stream Tokens ──► Save Message ──► Metadata/Sources ──► Done Event
```

The streaming controller (`streamChatController`) uses Express response flushing and SSE protocol (`text/event-stream`):

* **Stage 1 (Header Flush & Start)**: Sends `data: {"type": "start", "conversationId"}`.
* **Stage 2 (Token Generation)**: Yields LLM tokens asynchronously and writes `data: {"type": "token", "content": "..."}`.
* **Stage 3 (Persistence)**: Saves the complete assistant answer and page-aware `sources` to MongoDB `MessageModel`.
* **Stage 4 (Citations & Metadata)**: Sends `conversation` metadata, `sources` array (including `pageNumber`), and `responseType`.
* **Stage 5 (Completion)**: Emits `data: {"type": "done"}` and closes stream with `res.end()`.
* **Error Isolation**: Wrapped in a `try...catch` block. If an error occurs post-header flush, it writes an SSE error payload (`type: "error"`) instead of failing with `ERR_HTTP_HEADERS_SENT`.

---

## 🗄️ 4. Data Models & Schemas

### 4.1 Message Schema (`server/src/models/message.model.ts`)
```ts
const messageSchema = new mongoose.Schema({
  chat: { type: ObjectId, ref: "Conversation", required: true, index: true },
  role: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true },
  sources: [{
    documentId: { type: String },
    documentTitle: { type: String }, 
    chunkIndex: { type: Number },
    pageNumber: { type: Number },
    score: { type: Number },
  }],
  responseType: { type: String, enum: ["rag", "general", "hybrid"] }
}, { timestamps: true });
```

### 4.2 Conversation Schema (`server/src/models/conversation.model.ts`)
```ts
const conversationSchema = new mongoose.Schema({
  title: { type: String, default: "New Conversation", trim: true, maxLength: 100 },
  owner: { type: ObjectId, ref: "User", required: true, index: true },
  lastMessageAt: { type: Date, default: Date.now },
}, { timestamps: true });
```

### 4.3 Pinecone Vector Metadata Payload
```json
{
  "documentId": "65f8a9e102b3...",
  "documentTitle": "Technical_Manual_v2.pdf",
  "ownerId": "65f8a12c41d0...",
  "chunkIndex": 4,
  "pageNumber": 12,
  "content": "The operating pressure threshold must not exceed 450 PSI..."
}
```

---

## 🔐 5. Security & Environment Configuration

* **Authentication**: Token-based auth delivering JWTs inside `HTTP-Only` cookies for XSS mitigation.
* **Route Guards**: `AuthRequest` middleware enforcing session authorization on all `/api/documents`, `/api/chat`, and `/api/conversations` endpoints.
* **Vector Isolation**: Hard multi-tenancy enforced at the Pinecone query layer using `ownerId` metadata filters.

---

## 🛠️ 6. Technology Matrix

| Subsystem | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend UI** | React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion | Cursor/Linear-inspired dark glassmorphism dashboard & streaming chat UI |
| **State & Routing** | Redux Toolkit, React Router v7 | Session state, active chat management & protected routes |
| **Backend API** | Node.js, Express 5, TypeScript | REST endpoints, SSE streaming, authentication |
| **PDF Extraction** | `pdfjs-dist` (PDF.js) | Page-aware PDF text parsing |
| **Text Chunking** | LangChain `@langchain/textsplitters` | Semantic recursive text splitting |
| **Embedding Service** | Python 3.10+, FastAPI, SentenceTransformers | Local 384-dim dense vector generation (`all-MiniLM-L6-v2`) |
| **Vector Index** | Pinecone Serverless | Sub-100ms cosine similarity vector retrieval |
| **Database** | MongoDB Atlas (Mongoose) | User accounts, document metadata, chunks, chat history |
| **LLM Inference** | Ollama / Groq / OpenAI | Pluggable local & cloud LLM synthesis |
