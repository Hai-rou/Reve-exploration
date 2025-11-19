const express = require("express");
const Trip = require("../models/Trip");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

// Liste publique
router.get("/", async (_req, res) => {
  const items = await Trip.find({}).sort({ createdAt: -1 }).lean();
  res.json(items);
});

// Création (protégée)
router.post("/", requireAdmin, async (req, res) => {
  try {
    const created = await Trip.create(req.body || {});
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ error: "Trip invalide" });
  }
});


// Mise à jour (protégée)
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const updated = await Trip.findByIdAndUpdate(req.params.id, req.body || {}, { new: true });
    if (!updated) return res.status(404).json({ error: "Non trouvé" });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: "Requête invalide" });
  }
});

// Suppression (protégée)
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const deleted = await Trip.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Non trouvé" });
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: "Requête invalide" });
  }
});

module.exports = router;
