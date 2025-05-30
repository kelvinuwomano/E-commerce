const mongoose = require("mongoose");
require("dotenv/config");

const {MONGO_URL} = process.env;

const database = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Connected to database")
    } catch (error) {
        console.log("An error occurred", error)
    }
}

module.exports = database