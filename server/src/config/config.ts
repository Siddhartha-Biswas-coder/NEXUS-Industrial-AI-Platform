import { configDotenv } from "dotenv";
import z from "zod";

configDotenv();

const envSchema = z.object({
    PORT: z.coerce.number().default(3000),

    MONGODB_URI: z.string().min(1, "MONGODb URI is required"),

    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

    JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),

    CORS_ORIGIN: z.string(),

    JWT_ACCESS_TOKEN_EXPIRY: z
        .string()
        .default("7d"),

    EBEDDINGS_IP_ADDRESS: z
        .string()
        .default("127.0.0.1"),
    EBEDDINGS_PORT: z
        .coerce.number()
        .default(8000),

    PINECONE_API_KEY: z.string().min(1, "PINECONE_API_KEY is required"),

    PINECONE_INDEX_NAME: z.string().default("nexus-index"),
})

const envData = {
    PORT: process.env.PORT,

    MONGODB_URI: process.env.MONGODB_URI,

    NODE_ENV: process.env.NODE_ENV,

    JWT_SECRET: process.env.JWT_SECRET,

    CORS_ORIGIN: process.env.CORS_ORIGIN,

    JWT_ACCESS_TOKEN_EXPIRY: process.env.JWT_ACCESS_TOKEN_EXPIRY,

    EBEDDINGS_IP_ADDRESS: process.env.EBEDDINGS_IP_ADDRESS,
    EBEDDINGS_PORT: process.env.EBEDDINGS_PORT,

    PINECONE_API_KEY: process.env.PINECONE_API_KEY,

    PINECONE_INDEX_NAME: process.env.PINECONE_INDEX_NAME,
}

const parseEnv = envSchema.safeParse(envData);

if (!parseEnv.success) {
    console.error("❌ Invalid environment configuration:");
    console.error(parseEnv.error.issues);
    process.exit(1);
}

export const config = parseEnv.data;
export default config;