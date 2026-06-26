import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import planRoutes from "./routes/plans.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Plus Ultra API is running" });
});

app.use("/api/plans", planRoutes);

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing. Add it to your .env file.");
    }

    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Plus Ultra API running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
