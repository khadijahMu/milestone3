const mongoose = require("mongoose");
const flowerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    image: { type: String, required: true }, 
  },
  { timestamps: true } 
);
module.exports = mongoose.model("Flower", flowerSchema);
