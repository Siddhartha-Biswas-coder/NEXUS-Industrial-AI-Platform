# Nexus — Industrial AI Knowledge Platform

> An enterprise-grade Retrieval-Augmented Generation (RAG) platform designed to transform complex engineering documents, manuals, and technical research into an instant, context-aware AI knowledge assistant powered by local & cloud LLMs.

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?logo=fastapi)
![Ollama](https://img.shields.io/badge/Ollama-Local_LLM-black?logo=ollama)
![Groq](https://img.shields.io/badge/Groq-LPU_Inference-orange)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![Pinecone](https://img.shields.io/badge/Pinecone-Vector_DB-purple)

---

## 📌 Overview

**Nexus** bridges the gap between massive unstructured engineering documentation and actionable insights. Instead of manually navigating through hundreds of technical PDFs, maintenance manuals, standard operating procedures (SOPs), or research papers, Nexus enables engineers and operators to query their documentation using natural language.

Powered by a production-scale **Retrieval-Augmented Generation (RAG)** pipeline, Nexus extracts document content, performs semantic chunking, generates high-dimensional vector embeddings, stores vectors in **Pinecone** for sub-100ms similarity search, and synthesizes grounded contextual responses using a **Pluggable Multi-LLM Provider System** (Ollama Llama 3.2, Groq, OpenAI) with exact source citations and ChatGPT-style multi-conversation management.

---

## ✨ Key Features

### 🧠 Pluggable Multi-LLM Engine
* **Local & Privacy-First (Ollama)**: Run inference completely offline and locally using Ollama (`llama3.2:3b` or custom models) with zero data egress.
* **Ultra-Fast Cloud Inference (Groq & OpenAI)**: Seamlessly switch providers via environment configuration to use Groq LPU speed or OpenAI GPT models.
* **Grounded Synthesis**: Context-bound prompts ensure responses rely strictly on retrieved document chunks to eliminate hallucinations.

### 💬 RAG AI Assistant & Multi-Conversation Management
* **ChatGPT-Style Multi-Chat History**: Create, switch, rename, and delete conversations with persistent MongoDB storage.
* **Smart Auto-Titling**: Automatically generates clean conversation titles from the user's initial prompt or allows quick inline renaming.
* **URL-Based Conversation Routing**: Deep-link support for `/chat` (new draft chat) and `/chat/:conversationId` for active chat sessions.
* **LangChain Semantic Chunking**: Intelligently splits long-form technical PDFs using `RecursiveCharacterTextSplitter`.
* **FastAPI Local Embedding Microservice**: Generates 384-dimensional dense vectors using HuggingFace's `sentence-transformers/all-MiniLM-L6-v2`.
* **Pinecone Vector Database**: High-speed cosine similarity indexing for instant vector lookup.
* **Grounded Source Citations**: Trace every AI answer directly back to specific document IDs, chunk indices, and vector relevance score percentages.
* **Interactive AI Chat Interface**: Cursor & Perplexity inspired chat experience with Framer Motion message entrance animations, live typing indicators, glowing action buttons, and keyboard shortcuts (`Enter` / `Shift+Enter`).

### 📄 Document Intelligence & Pipeline
* **PDF Upload & Parsing**: Asynchronous PDF file extraction via `pdf-parse` and `multer`.
* **Live Pipeline Tracking**: Real-time status lifecycle (`uploaded` ➔ `processing` ➔ `indexed` or `failed`) with automatic background polling.
* **Dual Storage Architecture**: Document metadata, text chunks, conversations, & message histories in MongoDB Atlas paired with vector embeddings in Pinecone.
* **Document Vault**: Manage uploaded files, file sizes, vector namespaces, and processing statuses.

### 🔐 Security & Authentication
* **JWT & Cookie Security**: Authentication tokens delivered safely via `HTTP-Only` cookies.
* **Session Persistence**: Automated background session verification (`/auth/me`) keeping active sessions seamlessly logged in.
* **Route Guards**: Client-side `PublicRoute` and `ProtectedRoute` guards for route protection.

### 🎨 Linear & Cursor Inspired SaaS UI
* **Glassmorphism Aesthetic**: Dark theme (`bg-[#090a0f]`) with subtle backdrop blur, glowing cyan halos, and dark zinc cards.
* **Portaled Centered Modals**: Portaled React `createPortal` modal overlays (e.g. Delete Conversation modal) centered on screen cleanly above all CSS backdrop filters.
* **Interactive Upload Zone**: Large glowing cyan drop zone, hardware-accelerated animated SVG dashed drag borders, floating Framer Motion upload icon, hover glow button, spring progress bar, and glowing emerald checkmark success state.
* **Responsive Sidebar Layout**: Floating persistent sidebar with conversation listing, inline menus, and active indicators.

---

## 🏗️ Architecture

```
                                  ┌────────────────────────┐
                                  │   React 19 Frontend    │
                                  │ (Tailwind + Redux + TS)│
                                  └───────────┬────────────┘
                                              │ HTTP / REST
                                              ▼
                                  ┌────────────────────────┐
                                  │   Express 5 Backend    │
                                  │      (Node.js + TS)    │
                                  └────┬───────────┬───────┘
                                       │           │
           ┌───────────────────────────┴┐          └───────────────────────────┐
           │ Extract & Split Text       │                                      │ Read/Write
           ▼                            ▼                                      ▼
┌─────────────────────────────┐  ┌─────────────────────────────┐    ┌────────────────────┐
│ FastAPI Embedding Service   │  │   Pluggable LLM Engine      │    │   MongoDB Atlas    │
│ (all-MiniLM-L6-v2 Vectors)  │  │ (Ollama / Groq / OpenAI)    │    │ (Users, Docs,      │
└──────────┬──────────────────┘  └─────────────────────────────┘    │  Chunks, Chats)    │
           │ 384-dim Vectors                                        └────────────────────┘
           ▼
┌─────────────────────────────┐
│    Pinecone Vector DB       │
│  (Cosine Similarity Index)  │
└─────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Lucide React, Redux Toolkit, React Router v7 |
| **Backend API** | Node.js, Express 5, TypeScript, LangChain, Multer, `pdf-parse`, JWT, Cookie-Parser, Zod |
| **AI & Vector Service** | Python 3.10+, FastAPI, SentenceTransformers (`all-MiniLM-L6-v2`), Uvicorn |
| **LLM Inference** | Ollama (`llama3.2:3b`), Groq API, OpenAI API |
| **Vector DB & Database** | Pinecone Serverless Index, MongoDB Atlas (Mongoose) |
| **Tooling & Quality** | Oxlint, TSX, Git, npm |

---

## 📂 Project Structure

```text
nexus/
├── client/                     # React 19 Frontend
│   ├── src/
│   │   ├── app/                # App router, root layout, and route guards
│   │   ├── features/           # Feature modules (auth, chat, dashboard, documents, landing)
│   │   │   ├── auth/           # Login & Signup flows with Redux state
│   │   │   ├── chat/           # RAG Chat interface, ChatWindow, ChatInput, ConversationItem, useConversations
│   │   │   ├── dashboard/      # AppLayout, Sidebar, Topbar, QuickActions
│   │   │   └── documents/      # UploadZone, DocumentList, DocumentCard, useDocuments
│   │   ├── shared/             # Custom hooks, Redux store, and reusable utilities
│   │   └── styles/             # Global CSS and Tailwind design tokens
│   └── package.json
│
├── server/                     # Express 5 Backend API
│   ├── src/
│   │   ├── config/             # Environment & Pinecone / DB / LLM configs
│   │   ├── controllers/        # Express controllers (auth, documents, chat, conversation)
│   │   ├── middlewares/        # Authentication, validation, and error middlewares
│   │   ├── models/             # Mongoose schemas (User, Document, Chunk, Conversation, Message)
│   │   ├── routes/             # Router endpoints (auth, documents, chat, conversation)
│   │   ├── services/           # Business logic (RAG ingestion, vector search, LLM provider routing)
│   │   │   └── llm/            # Pluggable LLM Providers (Ollama, Groq, OpenAI)
│   │   └── validators/         # Zod schemas
│   └── package.json
│
└── embedding-service/          # Python Microservice
    ├── main.py                 # FastAPI embedding endpoint (/embed)
    └── requirements.txt
```

---

## 🔌 API Endpoints Summary

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/sign-up` | Create a new user account | ❌ |
| `POST` | `/api/auth/login` | Authenticate user and issue HTTP-only cookie | ❌ |
| `GET` | `/api/auth/me` | Fetch active user profile from session | ✅ |
| `POST` | `/api/auth/logout` | Clear authentication session cookie | ✅ |

### Document Management (`/api/documents`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/documents/upload` | Upload PDF, parse text, chunk, embed & index into Pinecone | ✅ |
| `GET` | `/api/documents` | List uploaded user documents & statuses (`uploaded`, `processing`, `indexed`, `failed`) | ✅ |
| `GET` | `/api/documents/:id/chunks` | Retrieve chunk details & debugging information | ✅ |

### Conversation Management (`/api/conversations`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/conversations` | Initialize a new conversation session | ✅ |
| `GET` | `/api/conversations` | List user's conversations sorted by latest activity | ✅ |
| `GET` | `/api/conversations/:conversationId/messages` | Fetch complete message history for a conversation | ✅ |
| `PATCH` | `/api/conversations/:conversationId` | Update conversation title | ✅ |
| `DELETE` | `/api/conversations/:conversationId` | Delete conversation and remove associated messages | ✅ |

### AI Assistant Chat (`/api/chat`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/chat` | Send question with conversation context, retrieve vector chunks, & synthesize response | ✅ |

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed locally:
* **Node.js** (v18.x or higher)
* **Python** (v3.10 or higher)
* **Ollama** (for local LLM execution, `llama3.2:3b` model)
* **MongoDB** connection string (MongoDB Atlas)
* **Pinecone** API Key & Index Name (384 dimensions, Cosine metric)

---

### 1. Setup Local LLM (Ollama)

Install [Ollama](https://ollama.com/) and pull the default Llama 3.2 model:

```bash
ollama run llama3.2:3b
```

---

### 2. Setup Embedding Service (FastAPI)

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

---

### 3. Setup Backend Server (Express)

Create a `.env` file inside the `server/` directory:

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

Install dependencies and start the backend development server:

```bash
cd server
npm install
npm run dev
```

---

### 4. Setup Frontend Client (React)

```bash
cd client
npm install
npm run dev
```

The application will be running locally at `http://localhost:5173`.

---

## 📋 License

This project is released under the [MIT License](LICENSE).
