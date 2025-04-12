const multer = require("multer");
const path = require("path");
const fs = require("fs");
// Ensure 'uploads/' directory exists
const uploadPath = path.join(__dirname, "../uploads/");
if (!fs.existsSync(uploadPath)) {
  console.log("Creating 'uploads' directory...");
  fs.mkdirSync(uploadPath, { recursive: true });
}
// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Saving file to:", uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueFilename = Date.now() + path.extname(file.originalname);
    console.log("Generated Filename:", uniqueFilename);
    cb(null, uniqueFilename);
  },
});
// File filter for images only
const fileFilter = (req, file, cb) => {
  console.log("File Type Received:", file ? file.mimetype : "No file detected");
  if (file && file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    console.error("Invalid File Type: Only image files are allowed");
    cb(new Error("Only image files are allowed"), false);
  }
};
// Multer upload configuration
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max size
});
module.exports = upload;
