const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const signToken = (user) =>
  jwt.sign({ sub: user._id.toString(), email: user.email }, process.env.JWT_SECRET || "dev_secret", {
    expiresIn: "7d",
  });

const setAuthCookie = (res, token) => {
  const prod = process.env.NODE_ENV === "production";
  const cross = process.env.CROSS_SITE === "1"; // si front et API domaines différents
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: cross ? "none" : prod ? "strict" : "lax",
    secure: cross ? true : prod,
    maxAge: 7 * 24 * 3600 * 1000,
  });
};

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "Champs requis" });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "Email déjà utilisé" });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash });
    const token = signToken(user);
    setAuthCookie(res, token);
    res.json({ email: user.email, role: user.role });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Identifiants invalides" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Identifiants invalides" });
    const token = signToken(user);
    setAuthCookie(res, token);
    res.json({ email: user.email, role: user.role });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.post("/logout", (req, res) => {
  const prod = process.env.NODE_ENV === "production";
  const cross = process.env.CROSS_SITE === "1";
  res.clearCookie("token", { httpOnly: true, sameSite: cross ? "none" : prod ? "strict" : "lax", secure: cross ? true : prod });
  res.json({ ok: true });
});

router.get("/me", async (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: "Non connecté" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
    const user = await User.findById(payload.sub).lean();
    if (!user) return res.status(401).json({ error: "Session invalide" });
    res.json({ email: user.email, role: user.role });
  } catch (e) {
    res.status(401).json({ error: "Session invalide" });
  }
});

module.exports = router;


