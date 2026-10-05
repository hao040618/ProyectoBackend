const mongoose = require("mongoose");

const cocheSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true, trim: true },
    kilometers: { type: Number, required: true },
    type: [{ type: String, enum: ["Hybrid", "Electric"], required: true }],
    img: { type: String },
  },
  {
    timestamps: true,
  },
);

const Coche = mongoose.model("coches", cocheSchema, "coches");
module.exports = Coche;
