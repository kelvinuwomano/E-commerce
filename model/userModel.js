const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    address: String
}, {timestamps: true})

module.exports = mongoose.model("User", userSchema)