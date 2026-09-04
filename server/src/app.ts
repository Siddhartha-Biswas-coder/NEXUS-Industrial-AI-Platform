import express from "express";
import morgan from "morgan";
import cors from "cors";
import config from "./config/config.ts";

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin: config.CORS_ORIGIN.split(",").map((url) => url.trim().replace(/\/$/, "")),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}))


app.get("/", (req, res) => {
    res.json({ message: "Nexus API is running!" });
});

app.get("/api/health", (_, res) => {
    res.json({
        status: "OK",
        service: "Nexus API"
    })
})

export default app;