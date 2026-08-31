require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const usersRouter = require("./src/api/routes/usuario");
const cochesRouter = require("./src/api/routes/coche");
const { connectCloudinary } = require("./src/config/cloudinary");

const app = express();

connectDB();
connectCloudinary();

app.use(express.json());

app.use("/prueba", (req, res, next) => {
    return res.status(200).json("Ruta 'prueba'");
});

app.use("/api/v1/users", usersRouter);

app.use("/api/v1/coches", cochesRouter);

app.use((req, res, next) => {
    return res.status(404).json("Ruta no encontrada");
});

app.listen(3000, () => {
    console.log("Servidor levantado en: http://localhost:3000");
});