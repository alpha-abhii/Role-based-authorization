import express from "express";
import dotenv from 'dotenv';

dotenv.config()

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

connectDB();

const app  = express();

app.use(express.json());

const PORT = process.env.PORT || 7000;

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})