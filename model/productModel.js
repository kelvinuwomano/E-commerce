const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type:Number,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true,
        enum : ["necklace", "ring", "bracelet", "watches", "bangle", "cufflinks", "sets"]
    },
    image: {
        type: [String],
        default: []
    },
}, { timestamps: true});


module.exports = mongoose.model("Product", productSchema)