const express = require("express");
const cors = require("cors");
const path = require("path");

// Database & Routes
const db = require("./models/db");
const authRoutes = require("./routes/auth");
const statsRoutes = require("./routes/stats");
const verifyRoutes = require("./routes/verify");

const app = express();
const PORT = process.env.PORT || 3000;

// --------------------
// MIDDLEWARE
// --------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend")));

// --------------------
// API ROUTES
// --------------------
app.use("/api/auth", authRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/verify", verifyRoutes);

// --------------------
// FRONTEND ROUTE
// --------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// --------------------
// START SERVER
// --------------------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
