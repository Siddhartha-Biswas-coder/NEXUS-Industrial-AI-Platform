# NEXUS — Industrial AI Knowledge & Document Intelligence Platform

> An enterprise-grade Retrieval-Augmented Generation (RAG) platform designed to transform complex engineering documents, technical manuals, Standard Operating Procedures (SOPs), and research papers into an instant, context-aware AI knowledge assistant powered by local & cloud LLMs.

<div align="center">

![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?style=for-the-badge&logo=node.js&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Python_3.10+-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Ollama](https://img.shields.io/badge/Ollama-Local_LLM-000000?style=for-the-badge&logo=ollama&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-LPU_Inference-F05A22?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Pinecone](https://img.shields.io/badge/Pinecone-Vector_DB-000000?style=for-the-badge&logo=pinecone&logoColor=white)

</div>

---

## 📌 Overview

**NEXUS** bridges the gap between massive unstructured engineering documentation and actionable operational intelligence. In mission-critical industrial, aerospace, energy, and software engineering environments, navigating through hundreds of technical PDFs, SOPs, component data sheets, or compliance manuals is slow and error-prone.

NEXUS empowers operators and engineers to query their entire document library in natural language with strict context grounding, zero hallucination tolerance, verifiable page-aware source citations, and direct in-app PDF inspection.

### 🌟 Key Highlights
* **Strict Context Grounding**: Vector similarity queries with dynamic thresholding guarantee responses are strictly rooted in uploaded documentation.
* **Page-Aware Citations & Interactive PDF Viewer**: Every generated answer links directly to the exact source document, chunk index, vector confidence score, and page number with a single-click animated in-app PDF preview.
* **Conversation-Scoped Active Document Filtering**: Filter and restrict RAG context per conversation session to specific active documents.
* **Real-Time Token Streaming (SSE)**: Ultra-low latency Server-Sent Events (SSE) streaming delivering real-time LLM token generation with post-flush error isolation.
* **Pluggable Multi-LLM Engine**: Run fully offline and privacy-first with local Ollama (`llama3.2:3b`), or leverage high-throughput cloud inference with Groq LPUs or OpenAI GPT models.
* **Linear & Cursor Inspired SaaS UI**: Dark glassmorphic aesthetic (`#090a0f`), responsive sidebar, fluid Framer Motion micro-interactions, and portaled modal overlays.

---

## ✨ Core Features

### ⚡ Real-Time SSE Token Streaming
* **Low-Latency Streaming**: End-to-end token streaming over Server-Sent Events (`text/event-stream`), delivering interactive token-by-token output.
* **Structured Stream Lifecycle**: Explicit event stages (`start` ➔ `token` ➔ `done`) transferring conversation metadata, response types, and source citations upon stream resolution.
* **Robust Error Handling**: Stream controllers isolate mid-stream errors and output SSE error events, preventing header flush crashes (`ERR_HTTP_HEADERS_SENT`).

### 📑 Page-Aware Ingestion & Contextual Chunking
* **PDF.js Text Extraction**: Sequential page-by-page extraction via `pdfjs-dist`, retaining the physical `pageNumber` for every line of text.
* **LangChain Semantic Chunking**: Employs `RecursiveCharacterTextSplitter` (chunk size: 1000 chars, overlap: 200 chars) ensuring context continuity across chunk boundaries while preserving page mappings.
* **FastAPI Dense Embedding Service**: Local Python microservice computing 384-dimensional dense vectors using HuggingFace's `sentence-transformers/all-MiniLM-L6-v2`.
* **Dual Indexing Architecture**: Pinecone Serverless for vector similarity search paired with MongoDB Atlas for full chunk text and document metadata storage.

### 🎯 Conversation-Scoped Document Filtering
* **Dynamic Document Selector**: Select, deselect, or batch-assign specific documents to any active conversation.
* **Vector-Layer Metadata Filtering**: Pinecone queries filter dynamically on `{ ownerId, documentId: { $in: activeDocuments } }`, ensuring zero context leakage between unrelated documents.
* **Persistent Workspace State**: Conversation document scopes are stored in MongoDB and synchronized across sessions.

### 🔍 Interactive Citations & Animated PDF Viewer
* **Grounded Source Cards**: AI responses include interactive source cards displaying document title, page number, and similarity confidence percentage (`XX% match`).
* **In-App Glass Sheet PDF Viewer**: Click any citation to open the document at that exact page in an animated, GPU-accelerated modal (`react-pdf` + Framer Motion).
* **Viewer Controls**: Page switching (`←`/`→`, `k`/`j`), zoom in/out (`+`/`-`), `Ctrl + Mouse Wheel` zooming, and keyboard shortcuts (`Esc` to close).

### 🧠 Pluggable Multi-LLM Inference
* **Local & Privacy-First (Ollama)**: Execute inference offline with zero data egress using local Ollama (`llama3.2:3b` or custom models).
* **High-Speed Cloud Inference (Groq & OpenAI)**: Switch providers seamlessly via server environment variables (`LLM_PROVIDER=groq | openai | ollama`).
* **Adaptive Prompt Service**: Dynamic prompt routing (`buildRAGPrompt`, `buildGeneralPrompt`, `buildHybridPrompt`) based on similarity score thresholds (`config.RAG_THRESHOLD`).

### 💬 Multi-Conversation Management
* **ChatGPT-Style Chat History**: Create, switch, rename, and delete conversations with persistent MongoDB storage.
* **Smart Auto-Titling**: Automatically generates clean conversation titles from the user's first query.
* **URL-Based Deep Linking**: Direct navigation support for `/chat` (draft) and `/chat/:conversationId` (active session).
* **Portaled Centered Modals**: Portaled React `createPortal` overlays for seamless confirmation dialogs above backdrop blur filters.

### 🔐 Enterprise Security & Auth
* **JWT & HTTP-Only Cookies**: Secure token delivery mitigating Cross-Site Scripting (XSS) risks.
* **Session Persistence**: Automatic `/api/auth/me` session validation keeping users authenticated across reloads.
* **Multi-Tenant Isolation**: Hard user isolation enforced at the vector query and database layers.

---

## 🏗️ System Architecture

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

## 🔄 RAG & Ingestion Lifecycle

```
[ User Uploads PDF ] ──► [ PDF.js Extracts Pages ] ──► [ LangChain Chunks Text ] ──► [ FastAPI /embed ]
                                                                                            │
                                                                                            ▼
[ SSE Client Stream ] ◄── [ LLM Prompt Synthesis ] ◄── [ Pinecone Cosine Query ] ◄── [ Vector Upsert ]
```

1. **Upload & Parse**: PDF uploaded via `multer` and parsed page-by-page with `pdfjs-dist` to record page offsets.
2. **Chunking**: Text split into 1000-character overlapping chunks maintaining exact `pageNumber` bindings.
3. **Embedding**: Chunks sent in batch to FastAPI embedding microservice (`all-MiniLM-L6-v2`) generating 384-dim dense vectors.
4. **Dual Storage**: Vectors and metadata indexed into **Pinecone Serverless**; chunk documents saved to **MongoDB Atlas**.
5. **Retrieval**: User question is embedded and matched against Pinecone filtered by `ownerId` and `activeDocuments`.
6. **Synthesis & Stream**: Relevant chunks are formatted into a grounded prompt and streamed token-by-token via SSE to the client.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19, TypeScript, Vite | Modern, component-driven client application |
| **Styling & Animation** | Tailwind CSS v4, Framer Motion | Glassmorphic dark theme, glowing UI, spring animations |
| **Client State & Routing** | Redux Toolkit, React Router v7 | Session state, active conversation routing & UI caching |
| **PDF Rendering** | `react-pdf`, `pdfjs-dist` | In-browser document viewer with zoom & page jumping |
| **Backend API** | Node.js, Express 5, TypeScript | REST endpoints, SSE token streaming, authentication |
| **Text Processing** | LangChain `@langchain/textsplitters` | Page-aware recursive semantic chunking |
| **Embedding Microservice** | Python 3.10+, FastAPI, Uvicorn | 384-dim dense vector generation (`all-MiniLM-L6-v2`) |
| **Vector Database** | Pinecone Serverless | Sub-100ms cosine similarity vector retrieval |
| **Primary Database** | MongoDB Atlas (Mongoose 9) | Multi-tenant users, documents, chunks, and message histories |
| **LLM Inference** | Ollama, Groq LPU, OpenAI API | Pluggable local and cloud generative synthesis |
| **Tooling & Code Quality** | Oxlint, TSX, Git | High-speed linting, runtime execution, version control |

---

## 📂 Project Structure

```text
nexus/
├── client/                          # React 19 Frontend (Vite + Tailwind v4 + Redux)
│   ├── src/
│   │   ├── app/                     # App router, root layout, route guards (Protected/Public)
│   │   ├── features/                # Domain-driven feature modules
│   │   │   ├── auth/                # Login, Signup, Redux auth state & cookies
│   │   │   ├── chat/                # RAG Chat interface, MessageList, DocumentSelector,
│   │   │   │   │                    # PdfViewerModal, SourceCard, SSE stream hooks
│   │   │   ├── dashboard/           # AppLayout, Sidebar, Topbar, QuickActions
│   │   │   ├── documents/           # UploadZone, DocumentList, DocumentCard, useDocuments
│   │   │   └── landing/             # Public landing page & feature highlights
│   │   ├── shared/                  # Axios instance, Redux store, UI hooks, utilities
│   │   └── styles/                  # Global CSS and Tailwind v4 theme definitions
│   └── package.json
│
├── server/                          # Express 5 Backend API (TypeScript)
│   ├── src/
│   │   ├── config/                  # Environment, MongoDB, Pinecone, Multer configs
│   │   ├── controllers/             # Express controllers (auth, documents, chat, conversation)
│   │   ├── middlewares/             # Auth JWT guard, request validation, error handler
│   │   ├── models/                  # Mongoose schemas (User, Document, Chunk, Conversation, Message)
│   │   ├── routes/                  # API route definitions
│   │   ├── services/                # Core business logic:
│   │   │   ├── chat.service.ts      # Standard & streaming chat orchestration
│   │   │   ├── chunk.service.ts     # Page-aware text splitting & DB persistence
│   │   │   ├── document.service.ts  # Ingestion workflow & pipeline lifecycle
│   │   │   ├── embedding.service.ts # FastAPI embedding client
│   │   │   ├── pdf.service.ts       # PDF.js page-by-page text extractor
│   │   │   ├── prompt.service.ts    # Grounded RAG, hybrid, and general prompt builders
│   │   │   ├── retrieval.service.ts # Pinecone similarity query with active doc filters
│   │   │   ├── vector.service.ts    # Pinecone vector upsert & index management
│   │   │   └── llm/                 # Pluggable LLM providers (Ollama, Groq, OpenAI)
│   │   └── validators/              # Zod request validation schemas
│   └── package.json
│
├── embedding-service/               # Python FastAPI Microservice
│   ├── main.py                      # /embed endpoint (SentenceTransformers all-MiniLM-L6-v2)
│   └── requirements.txt
│
├── architecture.md                  # Comprehensive technical system specification
└── README.md                        # Project documentation
```

---

## 🔌 API Reference

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/sign-up` | Create a new user account | ❌ |
| `POST` | `/api/auth/login` | Authenticate user and issue secure HTTP-only cookie | ❌ |
| `GET` | `/api/auth/me` | Fetch active authenticated user profile from session | ✅ |
| `POST` | `/api/auth/logout` | Clear authentication session cookie | ✅ |

### 📄 Document Management (`/api/documents`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/documents/upload` | Upload PDF, extract page text, chunk, embed & index in Pinecone | ✅ |
| `GET` | `/api/documents` | List uploaded user documents & ingestion status | ✅ |
| `GET` | `/api/documents/:documentId/file` | Stream/download document PDF blob for in-app viewer | ✅ |

### 💬 Conversation Management (`/api/conversations`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/conversations` | Initialize a new conversation session | ✅ |
| `GET` | `/api/conversations` | List user's conversations sorted by latest activity | ✅ |
| `GET` | `/api/conversations/:conversationId/messages` | Fetch complete message history with citations & metadata | ✅ |
| `PATCH` | `/api/conversations/:conversationId` | Update conversation title | ✅ |
| `PATCH` | `/api/conversations/:conversationId/active-documents` | Update conversation-scoped active document IDs | ✅ |
| `DELETE` | `/api/conversations/:conversationId` | Delete conversation and remove associated messages | ✅ |

### 🤖 AI Chat & RAG Assistant (`/api/chat`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/chat` | Standard RAG question-answering with citation metadata | ✅ |
| `POST` | `/api/chat/stream` | **Real-Time SSE token streaming** (`start` ➔ `token` ➔ `done`) | ✅ |

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed locally:
* **Node.js** (v18.x or higher)
* **Python** (v3.10 or higher)
* **Ollama** (optional for local LLM inference, default model: `llama3.2:3b`)
* **MongoDB** connection string (MongoDB Atlas or local)
* **Pinecone** API Key & Index (384 dimensions, Cosine metric)

---

### Step 1: Setup Local LLM (Ollama)
*Skip this step if using Groq or OpenAI.*

1. Install [Ollama](https://ollama.com/).
2. Pull and start the default Llama 3.2 model:
```bash
ollama run llama3.2:3b
```

---

### Step 2: Setup Embedding Microservice (FastAPI)

```bash
cd embedding-service
python -m venv venv

# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --port 8000 --reload
```

The embedding service will be live at `http://localhost:8000`.

---

### Step 3: Setup Backend Server (Express 5)

1. Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/nexus
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=http://localhost:5173
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=nexus-index
EMBEDDING_SERVICE_URL=http://localhost:8000

# Pluggable LLM Configuration (ollama | groq | openai)
LLM_PROVIDER=ollama
OLLAMA_URL=http://127.0.0.1:11434
LLM_MODEL=llama3.2:3b

# Optional Cloud LLM Keys:
# GROQ_API_KEY=your_groq_api_key
# OPENAI_API_KEY=your_openai_api_key
```

2. Install dependencies and start the development server:

```bash
cd server
npm install
npm run dev
```

The backend server will run at `http://localhost:5000`.

---

### Step 4: Setup Frontend Client (React 19)

```bash
cd client
npm install
npm run dev
```

The application will be accessible at `http://localhost:5173`.

---

## 📋 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
