const cloudinary = require("cloudinary").v2;

const connectCloudinary = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });
        console.log("Conexión a Cloudinary con éxito");
    } catch (error) {
        console.log("No es posible conectarse a Cloudinary");
    }
};

module.exports = { connectCloudinary };