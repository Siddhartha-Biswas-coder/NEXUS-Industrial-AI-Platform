# Nexus — Industrial AI Knowledge Platform

> An enterprise-grade Retrieval-Augmented Generation (RAG) platform designed to transform complex engineering documents, manuals, and technical research into an instant, context-aware AI knowledge assistant.

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?logo=fastapi)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![Pinecone](https://img.shields.io/badge/Pinecone-Vector_DB-purple)

---

## 📌 Overview

**Nexus** bridges the gap between massive unstructured engineering documentation and actionable insights. Instead of manually navigating through hundreds of technical PDFs, maintenance manuals, standard operating procedures (SOPs), or research papers, Nexus enables engineers and operators to query their documentation using natural language.

Powered by a production-scale **Retrieval-Augmented Generation (RAG)** pipeline, Nexus extracts document content, performs semantic chunking, generates high-dimensional vector embeddings, stores vectors in **Pinecone** for sub-100ms similarity search, and presents zero-hallucination contextual responses with exact source citations.

---

## ✨ Key Features

### 💬 RAG AI Assistant & Vector Search
* **LangChain Semantic Chunking**: Intelligently splits long-form technical PDFs using `RecursiveCharacterTextSplitter`.
* **FastAPI Local Embedding Microservice**: Generates 384-dimensional dense vectors using HuggingFace's `sentence-transformers/all-MiniLM-L6-v2`.
* **Pinecone Vector Database**: High-speed cosine similarity indexing for instant vector lookup.
* **Grounded Source Citations**: Trace every AI answer directly back to specific document IDs, chunk indices, and vector relevance score percentages.
* **Interactive AI Chat Interface**: Cursor & Perplexity inspired chat experience with Framer Motion message entrance animations, live typing indicators, glowing action buttons, and keyboard shortcuts (`Enter` / `Shift+Enter`).

### 📄 Document Intelligence & Pipeline
* **PDF Upload & Parsing**: Asynchronous PDF file extraction via `pdf-parse` and `multer`.
* **Live Pipeline Tracking**: Real-time status lifecycle (`uploaded` ➔ `processing` ➔ `indexed` or `failed`) with automatic background polling.
* **Dual Storage Architecture**: Document metadata & text chunk payloads in MongoDB Atlas paired with vector embeddings in Pinecone.
* **Document Vault**: Manage uploaded files, file sizes, vector namespaces, and processing statuses.

### 🔐 Security & Authentication
* **JWT & Cookie Security**: Authentication tokens delivered safely via `HTTP-Only` cookies.
* **Session Persistence**: Automated background session verification (`/auth/me`) keeping active sessions seamlessly logged in.
* **Route Guards**: Client-side `PublicRoute` and `ProtectedRoute` guards for route protection.

### 🎨 Linear & Cursor Inspired SaaS UI
* **Glassmorphism Aesthetic**: Dark theme (`bg-[#090a0f]`) with subtle backdrop blur, glowing cyan halos, and dark zinc cards.
* **Interactive Upload Zone**: Large glowing cyan drop zone, hardware-accelerated animated SVG dashed drag borders, floating Framer Motion upload icon, hover glow button, spring progress bar, and glowing emerald checkmark success state.
* **Responsive Layouts**: Modern, mobile-responsive layout across all desktop and mobile viewports.

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
           ┌───────────────────────────┘           └───────────────────────────┐
           │ Extract & Split Text                                              │ Read/Write
           ▼                                                                   ▼
┌─────────────────────────────┐                                     ┌────────────────────┐
│ FastAPI Embedding Service   │                                     │   MongoDB Atlas    │
│ (all-MiniLM-L6-v2 Vectors)  │                                     │ (Users, Docs,      │
└──────────┬──────────────────┘                                     │  Chunks Data)      │
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
│   │   │   ├── chat/           # RAG Chat interface, ChatWindow, ChatInput, SourceCard
│   │   │   └── documents/      # UploadZone, DocumentList, DocumentCard, useDocuments
│   │   ├── shared/             # Custom hooks, Redux store, and reusable utilities
│   │   └── styles/             # Global CSS and Tailwind design tokens
│   └── package.json
│
├── server/                     # Express 5 Backend API
│   ├── src/
│   │   ├── config/             # Environment & Pinecone / DB configs
│   │   ├── controllers/        # Express controllers (auth, documents, chat)
│   │   ├── middlewares/        # Authentication, validation, and error middlewares
│   │   ├── models/             # Mongoose schemas (User, Document, Chunk)
│   │   ├── routes/             # Router endpoints (auth, documents, chat)
│   │   ├── services/           # Business logic (RAG ingestion, vector search, Q&A)
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

### AI Assistant Chat (`/api/chat`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/chat` | Send question, retrieve relevant document vector chunks, & generate grounded answer with citations | ✅ |

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed locally:
* **Node.js** (v18.x or higher)
* **Python** (v3.10 or higher)
* **MongoDB** connection string (MongoDB Atlas)
* **Pinecone** API Key & Index Name (384 dimensions, Cosine metric)

---

### 1. Setup Embedding Service (FastAPI)

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

### 2. Setup Backend Server (Express)

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/nexus
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=http://localhost:5173
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=nexus-index
EMBEDDING_SERVICE_URL=http://localhost:8000
```

Install dependencies and start the backend development server:

```bash
cd server
npm install
npm run dev
```

---

### 3. Setup Frontend Client (React)

```bash
cd client
npm install
npm run dev
```

The application will be running locally at `http://localhost:5173`.

---

## 📋 License

This project is released under the [MIT License](LICENSE).
