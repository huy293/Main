// server.js
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const db = require("./config/db"); // Kết nối đến cơ sở dữ liệu
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("Server is running..."));
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
