const { deleteFile } = require("../../utils/deleteFile");
const Coche = require("../models/coche");
const User = require("../models/usuario");

const getCars = async (req, res, next) => {
    try {
        const cars = await Coche.find();
        return res.status(200).json(cars);
    } catch (error) {
        return res.status(400).json("No se han podido obtener los datos");
    }
};

const postCar = async (req, res, next) => {
    try {
        if (req.user.rol[0] === "Admin") {

        const newCar = new Coche(req.body);

        if (req.file) {
            newCar.img = req.file.path;
        }

        const carSaved = await newCar.save();
        return res.status(201).json(carSaved);
        } else {
            return res.status(401).json("No autorizado")
        }
    } catch (error) {
        return res.status(400).json("Error");
    }
};

const deleteCar = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userRentedCar = await User.findOne({ rentedCar: id }); 
        const cars = await Coche.find();
        let carDeleted;
        let delCarUserArray;

        if (req.user.rentedCar.includes(id)) {    
            delCarUserArray = req.user.rentedCar.splice(req.user.rentedCar.indexOf(id), 1);
            await req.user.save();
            // carDeleted = await Coche.findByIdAndDelete(id);            
        } else if (req.user.rol[0] === "Admin") {
            if (userRentedCar) {
                delCarUserArray = userRentedCar.rentedCar.splice(userRentedCar.rentedCar.indexOf(id), 1);
                await userRentedCar.save();
                // carDeleted = await Coche.findByIdAndDelete(id);
            } else if (!userRentedCar) {
                carDeleted = await Coche.findByIdAndDelete(id);

                if (userRentedCar) {
                    userRentedCar.rentedCar.splice(userRentedCar.rentedCar.indexOf(id), 1);
                } 

                if (carDeleted.img) {
                    deleteFile(carDeleted.img);
                }                   
            }   
        } else {
            return res.status(401).json("No autorizado");
        }

        return res.status(200).json({
            message: "Elemento eliminado",
            elemento: carDeleted || delCarUserArray
        });     
    } catch (error) {
        console.log(error);
        return res.status(400).json("Error");
    }
};

const updateCar = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newCar = new Coche(req.body);
        newCar._id = id;
        const oldCar = await Coche.findById(id);

        if (newCar.type.length === 0) {
            newCar.type = oldCar.type;
        } 

        if (req.user.rol[0] === "Admin") {
            const carUpdated = await Coche.findByIdAndUpdate(id, newCar, {
                new: true 
            });
            return res.status(200).json(carUpdated);
        } else {
            return res.status(401).json("No autorizado");
        }
    } catch (error) {
        return res.status(400).json("Error");
    }
};

module.exports = {
    postCar,
    deleteCar,
    getCars,
    updateCar
};