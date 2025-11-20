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

// CORS: en local autorise localhost:5173, en prod reflète l'origine (même domaine Vercel)
const defaultOrigin = process.env.FRONT_ORIGIN || true; // true => reflète l'origine de la requête
app.use(cors({ origin: defaultOrigin, credentials: true }));

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/reves_exploration";
// Connexion Mongo au chargement du module (buffering Mongoose gère les appels pendant l'init)
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connecté"))
  .catch((e) => {
    console.error("MongoDB erreur:", e);
    // En serverless on ne tue pas le process; en local ce sera géré par index.js
  });

// Health (avec alias sans /api pour compatibilité chemin sur Vercel si /api préfixe est retiré)
app.get(["/api/health", "/health"], (_req, res) => res.json({ ok: true }));

// OPTIONS preflight global (évite 405 si préflight tombe sur une route Express non définie)
app.options("*", cors({ origin: defaultOrigin, credentials: true }));

// Routes API principales + alias sans /api si Vercel retire le segment
app.use(["/api/auth", "/auth"], authRoutes);
app.use(["/api/trips", "/trips"], tripRoutes);
app.use(["/api/media", "/media"], mediaRoutes);

// Fichiers uploadés (en serverless, stockage éphémère)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

module.exports = app;
