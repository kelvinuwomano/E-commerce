const mongoose = require("mongoose")


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            qty: {
                type: Number,
                required: true
            }
        }
    ],
    status: {
        type: String,
        enum : [ "Pending", "Decline", "Delivered"],
        default : "Pending",
    },
    totalAmount : {
        type: Number,
        required: true
    }
    
}, {timestamps: true})


module.exports = mongoose.model("Order", orderSchema)