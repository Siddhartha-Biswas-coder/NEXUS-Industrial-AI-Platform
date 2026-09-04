import { configDotenv } from "dotenv";
import z from "zod";

configDotenv();

const envSchema = z.object({
    PORT: z.coerce.number().default(3000),

    MONGODB_URI: z.string().min(1, "MONGODb URI is required"),

    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

    JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),

    CORS_ORIGIN: z.string(),
})

const envData = {
    PORT: process.env.PORT,

    MONGODB_URI: process.env.MONGODB_URI,

    NODE_ENV: process.env.NODE_ENV,

    JWT_SECRET: process.env.JWT_SECRET,

    CORS_ORIGIN: process.env.CORS_ORIGIN,
}

const parseEnv = envSchema.safeParse(envData);

if (!parseEnv.success) {
    console.error("❌ Invalid environment configuration:");
    console.error(parseEnv.error.issues);
    process.exit(1);
}

export const config = parseEnv.data;
export default config;