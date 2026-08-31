const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    rentedCar: [{ type: mongoose.Types.ObjectId, ref: "coches" }],
    rol: [{ type: String, enum: ["User"], required: true }]
}, {
    timestamps: true
});

userSchema.pre("save", function () {
    this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model("users", userSchema, "users");
module.exports = User;