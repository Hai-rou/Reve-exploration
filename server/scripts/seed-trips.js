require("dotenv").config();
const mongoose = require("mongoose");
const Trip = require("../models/Trip");

(async () => {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/reves_exploration";
  try {
    await mongoose.connect(uri);
    console.log(`Connecté à MongoDB: ${uri}`);

    const data = [
      {
        title: "USA Ouest",
        subtitle: "Parcs, canyons et villes mythiques",
        mediaUrl: "/image/monument-valley1.webp",
        mediaAlt: "Monument Valley au coucher du soleil",
        badge: "Voyage signature",
        facts: [
          { icon: "⏱", text: "10 jours" },
          { icon: "📍", text: "Las Vegas, Monument Valley, Zion" }
        ],
        highlights: ["Monument Valley", "Zion Canyon", "Strip de Las Vegas"],
        itinerary: [
          { side: "left", title: "Las Vegas", subtitle: "Arrivée et soirée lumineuse" },
          { side: "right", title: "Monument Valley", subtitle: "Pistes et panoramas" },
          { side: "left", title: "Zion", subtitle: "Randonnées faciles" }
        ],
        includes: ["Hébergements", "Location voiture", "Carnet de route"],
        note: "Itinéraire modulable selon votre rythme",
        ctaLabel: "Demander ce voyage"
      },
      {
        title: "Égypte",
        subtitle: "Temples et Nil intemporel",
        mediaUrl: "/image/temple_horus.webp",
        mediaAlt: "Temple d'Horus à Edfou",
        badge: "Voyage signature",
        facts: [
          { icon: "⏱", text: "8 jours" },
          { icon: "🚢", text: "Croisière sur le Nil" }
        ],
        highlights: ["Karnak", "Philae", "Temple d'Horus"],
        itinerary: [
          { side: "left", title: "Louxor", subtitle: "Vallée des Rois" },
          { side: "right", title: "Edfou", subtitle: "Temple d'Horus" },
          { side: "left", title: "Assouan", subtitle: "Philae au crépuscule" }
        ],
        includes: ["Hébergements", "Guide égyptologue", "Croisière"],
        note: "Extensions possibles à Abou Simbel",
        ctaLabel: "Demander ce voyage"
      },
      {
        title: "Mexique",
        subtitle: "Yucatán entre cités mayas et cenotes",
        mediaUrl: "/image/las_flores.webp",
        mediaAlt: "Façade colorée au Yucatán",
        badge: "Voyage signature",
        facts: [
          { icon: "⏱", text: "9 jours" },
          { icon: "🏛", text: "Sites mayas et villes coloniales" }
        ],
        highlights: ["Chichén Itzá", "Cenotes", "Valladolid"],
        itinerary: [
          { side: "left", title: "Cancún", subtitle: "Arrivée et plage" },
          { side: "right", title: "Valladolid", subtitle: "Cenotes et couleurs" },
          { side: "left", title: "Chichén Itzá", subtitle: "Meraviglia maya" }
        ],
        includes: ["Hébergements", "Voiture", "Assistance 24/7"],
        note: "Possibilité d'extension à Tulum",
        ctaLabel: "Demander ce voyage"
      }
    ];

    for (const t of data) {
      const updated = await Trip.findOneAndUpdate(
        { title: t.title },
        { $set: t },
        { upsert: true, new: true }
      );
      console.log(`Trip prêt: ${updated.title}`);
    }

    await mongoose.disconnect();
    console.log("Seed trips terminé.");
    process.exit(0);
  } catch (e) {
    console.error("Echec du seed trips:", e);
    process.exit(1);
  }
})();
