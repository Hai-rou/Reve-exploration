require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

(async () => {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/reves_exploration";
  const email = process.env.SEED_EMAIL || "admin@example.com";
  const password = process.env.SEED_PASSWORD || "admin1234";

  try {
    await mongoose.connect(uri);
    console.log(`Connecté à MongoDB: ${uri}`);

    let user = await User.findOne({ email });
    const passwordHash = await bcrypt.hash(password, 10);
    if (!user) {
      user = await User.create({ email, passwordHash, role: "admin" });
      console.log(`Utilisateur admin créé: ${email}`);
    } else {
      if (user.role !== "admin") {
        user.role = "admin";
        user.passwordHash = passwordHash; // on régénère le hash fourni
        await user.save();
        console.log(`Utilisateur mis à jour en admin: ${email}`);
      } else {
        console.log(`Utilisateur déjà admin: ${email}`);
      }
    }

    console.log("Terminé. Vous pouvez vous connecter via /api/auth/login.");
    await mongoose.disconnect();
    process.exit(0);
  } catch (e) {
    console.error("Echec du seed:", e);
    process.exit(1);
  }
})();
