import app from "./src/app.ts";
import config from "./src/config/config.ts";
import connectDB from "./src/config/database.ts";

const PORT = config.PORT;

const startServer = async () => {

    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Nexus API running on http://localhost:${PORT}`);
        })
    } catch (error) {
        console.error("❌ Failed to start server");
        console.error(error);
        process.exit(1);
    }
}

startServer();