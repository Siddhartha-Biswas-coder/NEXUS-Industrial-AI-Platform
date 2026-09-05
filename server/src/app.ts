import express from "express";
import morgan from "morgan";
import cors from "cors";
import config from "./config/config.ts";
import errorHandler from "./middlewares/errorHandler.ts";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.ts";
import documentRoutes from "./routes/document.routes.ts";

const app = express();

app.use(cors({
    origin: config.CORS_ORIGIN.split(",").map((url) => url.trim().replace(/\/$/, "")),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}))

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.get("/", (_, res) => {
    res.json({ message: "Nexus API is running!" });
});

app.get("/api/health", (_, res) => {
    res.json({
        status: "OK",
        service: "Nexus API"
    })
})


app.use("/api/auth", authRoutes)
app.use("/api/documents", documentRoutes)

app.use(errorHandler);

export default app;