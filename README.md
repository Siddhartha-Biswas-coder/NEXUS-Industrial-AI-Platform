# Nexus – Industrial AI Knowledge Platform

> An enterprise-grade Retrieval-Augmented Generation (RAG) platform that transforms technical documents into an AI-powered knowledge assistant.

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![React](https://img.shields.io/badge/React-TypeScript-61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248)
![Pinecone](https://img.shields.io/badge/Pinecone-Vector_DB-purple)
![Status](https://img.shields.io/badge/Status-v0.1.0-success)

---

## Overview

Nexus is a full-stack Industrial AI Platform designed for engineering teams, research organizations, and Industry 4.0 environments.

Instead of manually searching through hundreds of PDFs, maintenance manuals, SOPs, and research papers, users can upload documents and ask questions in natural language. Nexus combines semantic search, vector embeddings, and Retrieval-Augmented Generation (RAG) to retrieve relevant information with contextual accuracy.

The project follows a production-style architecture with separate services for document processing, embedding generation, and vector search.

---

## Features

### Authentication

* JWT Authentication
* Secure HTTP-only cookies
* Signup/Login
* Protected routes

### Document Management

* PDF uploads
* Automatic text extraction
* Metadata storage
* Upload history

### RAG Pipeline

* PDF text extraction
* LangChain-based semantic chunking
* MongoDB chunk storage
* Local embedding generation (MiniLM)
* Automatic Pinecone vector indexing

### AI Infrastructure

* FastAPI embedding microservice
* Sentence Transformers (`all-MiniLM-L6-v2`)
* 384-dimensional embeddings
* Pinecone semantic vector search

---

## Architecture

<svg viewBox="0 0 980 360" width="100%" height="360" xmlns="http://www.w3.org/2000/svg">
  <rect x="60" y="30" width="140" height="46" rx="10" fill="none" stroke="currentColor"/>
  <text x="130" y="58" text-anchor="middle" font-size="14">Upload PDF</text>

  <path d="M130 76 L130 116" stroke="currentColor" stroke-width="2"/>

  <rect x="60" y="116" width="140" height="46" rx="10" fill="none" stroke="currentColor"/>
  <text x="130" y="144" text-anchor="middle" font-size="14">Extract Text</text>

  <path d="M130 162 L130 202" stroke="currentColor" stroke-width="2"/>

  <rect x="60" y="202" width="140" height="46" rx="10" fill="none" stroke="currentColor"/>
  <text x="130" y="230" text-anchor="middle" font-size="14">Chunk Text</text>

  <path d="M200 225 L340 225" stroke="currentColor" stroke-width="2"/>

  <rect x="340" y="202" width="170" height="46" rx="10" fill="none" stroke="currentColor"/>
  <text x="425" y="230" text-anchor="middle" font-size="14">Python Embeddings</text>

  <path d="M510 225 L670 225" stroke="currentColor" stroke-width="2"/>

  <rect x="670" y="202" width="170" height="46" rx="10" fill="none" stroke="currentColor"/>
  <text x="755" y="230" text-anchor="middle" font-size="14">Pinecone Index</text>

  <path d="M130 248 L130 300" stroke="currentColor" stroke-width="2"/>

  <rect x="60" y="300" width="140" height="46" rx="10" fill="none" stroke="currentColor"/>
  <text x="130" y="328" text-anchor="middle" font-size="14">MongoDB</text>
</svg>

---

## Tech Stack

### Frontend (Upcoming)

* React
* TypeScript
* Vite
* Tailwind CSS

### Backend

* Node.js
* Express
* TypeScript
* JWT Authentication
* Multer

### Database

* MongoDB Atlas
* Mongoose

### AI Stack

* LangChain
* Sentence Transformers
* FastAPI
* Pinecone

### DevOps

* Git
* Docker *(Upcoming)*

---

## Project Structure

```text
nexus/
├── client/
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── validators/
│   └── uploads/
└── embedding-service/
    ├── main.py
    └── venv/
```

---

## Current API Endpoints

### Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | `/api/auth/signup` |
| POST   | `/api/auth/login`  |

### Documents

| Method | Endpoint                              |
| ------ | ------------------------------------- |
| POST   | `/api/documents/upload`               |
| GET    | `/api/documents/:id/chunks` *(Debug)* |

---

## RAG Pipeline

The current ingestion workflow automatically processes every uploaded PDF.

1. Upload PDF
2. Extract text
3. Split into semantic chunks
4. Store chunks in MongoDB
5. Generate MiniLM embeddings
6. Index vectors into Pinecone

This creates a scalable foundation for semantic document retrieval.

---

## Local Development

### 1. Clone

```bash
git clone https://github.com/yourusername/nexus.git
cd nexus
```

### 2. Backend

```bash
cd server
npm install
npm run dev
```

### 3. Embedding Service

```bash
cd embedding-service
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --port 8000
```

---

## Environment Variables

### Backend

```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
CORS_ORIGIN=http://localhost:5173
PINECONE_API_KEY=your_key
PINECONE_INDEX_NAME=nexus-index
```

---

## Development Roadmap

### Completed (v0.1.0)

* [x] JWT Authentication
* [x] PDF Upload
* [x] PDF Text Extraction
* [x] LangChain Chunking
* [x] MongoDB Storage
* [x] Local Embedding Service
* [x] Pinecone Vector Indexing

### In Progress

* [ ] AI Chat Endpoint
* [ ] Semantic Retrieval
* [ ] Citation Generation

### Upcoming

* [ ] React Chat Interface
* [ ] Chat History
* [ ] Collaborative Workspaces
* [ ] Analytics Dashboard
* [ ] Docker Deployment
* [ ] Role-Based Permissions

---

## Why This Project?

Nexus demonstrates production-scale software engineering concepts including:

* Full-Stack Development
* Microservice Architecture
* Retrieval-Augmented Generation
* Vector Databases
* Semantic Search
* Authentication
* System Design
* AI Infrastructure

Rather than building a simple chatbot, Nexus is designed as an enterprise-ready AI knowledge platform inspired by real Industry 4.0 document intelligence systems.

---

## Version

**Current Release:** `v0.1.0`

**Milestone:** Document Ingestion & Vector Indexing Pipeline

---

## License

This project is licensed under the MIT License.
