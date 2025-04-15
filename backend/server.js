require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const flowerRoutes = require('./routes/flowerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const upload = require('./config/multerConfig'); 
const app = express();
const PORT = process.env.PORT || 5000;
// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static Files
app.use('/admin', express.static(path.join(__dirname, 'admin')));
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes
app.use("/api/flowers", flowerRoutes);
app.use("/admin/api", adminRoutes);
//HTML routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "admin", "index.html"));
});
app.post('/admin/add-flower', upload.single('image'), (req, res) => {
  const newFlower = {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    imagePath: `/uploads/${req.file.filename}`
  };
  app.get('/api/flowers', async (req, res) => {
    try {
      const flowers = await Flower.find();
      res.json(flowers);
    } catch (error) {
      console.error('Error fetching flowers:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  app.delete('/api/flowers/:id', async (req, res) => {
    try {
      await Flower.findByIdAndDelete(req.params.id);
      res.status(200).send('Flower deleted');
    } catch (error) {
      console.error('Error deleting flower:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  // Saves newFlower to database 
  console.log("Flower received:", newFlower);
  res.redirect('/admin');
});
app.get("/admin/add-flower", (req, res) => {
  res.sendFile(path.join(__dirname, "admin", "AddFlowers.html"));
});
// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
