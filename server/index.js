require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const tripRoutes = require("./routes/trips");
const mediaRoutes = require("./routes/media");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/reves_exploration";
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connecté"))
  .catch((e) => {
    console.error("MongoDB erreur:", e);
    process.exit(1);
  });

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/media", mediaRoutes);

// Fichiers uploadés servis statiquement
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API sur http://localhost:${port}`));
