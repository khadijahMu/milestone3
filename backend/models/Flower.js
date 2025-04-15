const mongoose = require('mongoose');

const flowerSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  description: String,
  imagePath: String
});

// Prevent model overwrite error in development (e.g., when using nodemon)
module.exports = mongoose.models.Flower || mongoose.model('Flower', flowerSchema);
