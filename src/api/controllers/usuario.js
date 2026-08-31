const bcrypt = require("bcrypt");
const User = require("../models/usuario");
const { generateSign } = require("../../utils/jwt");

const register = async (req, res, next) => {
    try {
        const user = new User(req.body);

        const duplicatedUser = await User.findOne({ email: req.body.email });

        if (duplicatedUser) {
            return res.status(400).json("Email ya existente");
        }

        const duplicatedRentedCar = await User.findOne({ rentedCar: req.body.rentedCar });

        if (duplicatedRentedCar) {
            return res.status(400).json("Coche ya alquilado");
        }

        const userSaved = await user.save();
        return res.status(201).json(userSaved);
    } catch (error) {
        return res.status(400).json("Error");
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json("Datos aportados incorrectos");
        }

        if (bcrypt.compareSync(password, user.password)) {
            const token = generateSign(user._id);
            return res.status(200).json({ token, user });
        } else {
            return res.status(400).json("Datos aportados incorrectos");
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().populate("rentedCar");
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(400).json("No se han podido conseguir los usuarios");
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newUser = new User(req.body);
        newUser._id = id;
        const oldUser = await User.findById(id);
        const duplicatedCar = await User.findOne({ rentedCar: newUser.rentedCar[0] });

        if (req.user._id.toString() === id || req.user.rol[0] === "Admin") {
            if (newUser.rentedCar.length === 0) {
                newUser.rentedCar = [...oldUser.rentedCar, ...newUser.rentedCar];
            } else if (newUser.rentedCar.length > 0 && duplicatedCar) {
                return res.status(400).json("Coche no disponible actualmente");
            } else {
                newUser.rentedCar = [...oldUser.rentedCar, ...newUser.rentedCar];
            }

            if (newUser.rol.length === 0) {
                newUser.rol = oldUser.rol;
            } else if (oldUser.rol[0] === "Admin" || req.user.rol[0] === "Admin") {
                newUser.rol = newUser.rol;
            } else {
                return res.status(401).json("No autorizado");
            }

            if (newUser.password != undefined) {
                newUser.password = bcrypt.hashSync(newUser.password, 10);
            }

            const userUpdated = await User.findByIdAndUpdate(id, newUser, {
                new: true
            });

            return res.status(200).json(userUpdated);
        } else {
            return res.status(401).json("No autorizado");
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json("Error");
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        if (id === req.user._id.toString() || req.user.rol[0] === "Admin") {
            const userDeleted = await User.findByIdAndDelete(id);
            return res.status(200).json({
                message: "Usuario eliminado",
                elemento: userDeleted
            });            
        } else {
            return res.status(401).json("No autorizado");
        }

    } catch (error) {
        return res.status(400).json("Error");
    }
};

module.exports = {
    register,
    login,
    getUsers,
    updateUser,
    deleteUser
};