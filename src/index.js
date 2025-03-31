import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import pool from "./config/db.js";

import errorHandler from "./middlewares/errorHandler.js";

import userRoutes from "./routes/userRoute.js";
import projectRoutes from "./routes/projectRoute.js";
import createUserTable from "./data/createUserTable.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;
export const jwtSecret = process.env.JWT_SECRET || "defaultsecret";

// middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api", userRoutes);
app.use("/api/projects", projectRoutes);

//error handling
app.use(errorHandler);

// create tables
createUserTable();

// testing db connection
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`The database is connected: ${result.rows[0].current_database}`);
});

// server running
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
