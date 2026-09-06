from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer


app = FastAPI(title="Nexus Embedding Service")

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

class EmbedRequest(BaseModel):
    texts : list[str]

@app.post("/embed")
def embed(req: EmbedRequest):
    vectors = model.encode(req.texts).tolist()

    return {
        "dimensions" : len(vectors[0]),
        "embeddings" : vectors
    }

@app.get("/")
def root():
    return {"message" : "Embedding service is running"}