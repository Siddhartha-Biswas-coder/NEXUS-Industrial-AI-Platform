import {Pinecone} from "@pinecone-database/pinecone"
import config from "./config.ts";

const pinecone = new Pinecone({
    apiKey: config.PINECONE_API_KEY,
})

export const pineconeIndex = pinecone.index(config.PINECONE_INDEX_NAME);

export default pinecone