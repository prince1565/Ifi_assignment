import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
// Allow only your frontend domain
app.use(
  cors({
    origin: [
      "https://ifi-assignment-f3zv.vercel.app", // <-- replace with your actual frontend URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if you’re using cookies or auth headers
  })
);
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
