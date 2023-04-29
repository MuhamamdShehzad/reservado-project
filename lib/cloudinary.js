const cloudinaryModule = require("cloudinary");

const cloudinary = cloudinaryModule.v2;
// Configuration
cloudinary.config({
  cloud_name: "dldafozbu",
  api_key: "724929628692594",
  api_secret: "MbmMy8oIIdBPui4nJ4Y7jjvod-8",
});

module.exports = cloudinary;
