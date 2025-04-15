const multer = require("multer");
const path = require("path");
const fs = require("fs");
// Define uploads path
const uploadPath = path.join(__dirname, "../uploads");
// Ensure the uploads folder exists
if (!fs.existsSync(uploadPath)) {
  console.log("Creating 'uploads' directory...");
  fs.mkdirSync(uploadPath, { recursive: true });
}
// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Saving image to:", uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    console.log("Generated file name:", uniqueName);
    cb(null, uniqueName);
  },
});
// Filter allow image uploads
const fileFilter = (req, file, cb) => {
  console.log("Received file type:", file?.mimetype || "No file");
  if (file && file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};
// Initialize and export multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});
module.exports = upload;
