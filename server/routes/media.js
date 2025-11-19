const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ts = Date.now();
    const safe = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, "_");
    cb(null, `${ts}_${safe}`);
  },
});
const upload = multer({ storage });

// Liste des fichiers uploadés (protégée)
router.get("/", requireAdmin, async (_req, res) => {
  const files = fs.readdirSync(uploadDir).filter(f => !f.startsWith("."));
  const baseUrl = "/uploads";
  res.json(files.map(f => ({ name: f, url: `${baseUrl}/${f}` })));
});

// Upload (protégée)
router.post("/upload", requireAdmin, upload.single("file"), (req, res) => {
  res.status(201).json({ name: req.file.filename, url: `/uploads/${req.file.filename}` });
});

// Suppression (protégée)
router.delete("/:name", requireAdmin, (req, res) => {
  const file = path.join(uploadDir, req.params.name);
  if (!fs.existsSync(file)) return res.status(404).json({ error: "Non trouvé" });
  fs.unlinkSync(file);
  res.json({ ok: true });
});

module.exports = router;
