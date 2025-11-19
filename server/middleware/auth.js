const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function attachUser(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: "Non connecté" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
    // Charger le rôle depuis la base pour ne pas stocker trop d'infos dans le token
    const user = await User.findById(payload.sub).lean();
    if (!user) return res.status(401).json({ error: "Session invalide" });
    req.user = { id: payload.sub, email: payload.email, role: user.role };
    next();
  } catch {
    return res.status(401).json({ error: "Session invalide" });
  }
}

function requireAuth(req, res, next) {
  attachUser(req, res, next);
}

function requireAdmin(req, res, next) {
  attachUser(req, res, () => {
    if (req.user.role !== "admin") return res.status(403).json({ error: "Accès refusé" });
    next();
  });
}

module.exports = { requireAuth, requireAdmin };
