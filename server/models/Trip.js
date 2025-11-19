const { Schema, model } = require("mongoose");

const factSchema = new Schema({ icon: String, text: String }, { _id: false });
const itineraryItemSchema = new Schema({
  side: { type: String, enum: ["left", "right"], default: "left" },
  title: String,
  subtitle: String,
  modalTitle: String,
  modalText: String,
}, { _id: false });

const tripSchema = new Schema({
  mediaUrl: { type: String, required: true },
  mediaAlt: { type: String, default: "" },
  badge: { type: String, default: "Voyage signature" },
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  facts: { type: [factSchema], default: [] },
  highlights: { type: [String], default: [] },
  itinerary: { type: [itineraryItemSchema], default: [] },
  includes: { type: [String], default: [] },
  note: { type: String, default: "" },
  ctaLabel: { type: String, default: "Demander ce voyage" },
}, { timestamps: true });

module.exports = model("Trip", tripSchema);
