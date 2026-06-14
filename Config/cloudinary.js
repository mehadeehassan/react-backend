// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const multer = require("multer");

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "products",
//     allowed_formats: ["jpg", "jpeg", "png", "webp", "avif"],
//     transformation: [{ width: 500, height: 500, crop: "limit" }],
//   },
// });

// const upload = multer({ storage });
// module.exports = { upload, cloudinary };

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'Public/Products',
  
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  } 
});

module.exports = multer({ storage });