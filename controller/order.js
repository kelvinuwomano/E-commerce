const cartModel = require("../model/cartModel");
const orderModel = require("../model/orderModel");
const productModel = require("../model/productModel");




// exports.createOrder = async (req, res) => {
//     try {
//         const {items} = req.body;
//         if (!items || items.length === 0) {
//             return res.status(400).json({message: "No order items"})
//         }

//         let totalAmount = 0;

//         for (const item of items) {
//             const product = await productModel.findById(item.product)

//             if (!product) return res.status(400).json({message: "Product not found"})
//             if (product.stock < item.qty) return res.status(400).json({message: `Not enough stock for ${product.name}`})
                
//             totalAmount += product.price * item.qty;
//             product.stock -= item.qty;
//             await product.save(); 
//         }

//         const order = new orderModel({
//             user: req.user._id,
//             items,
//             totalAmount
//         })
//         const createdOrder = await order.save();
//         return res.status(201).json({message: "Order created successfully", createdOrder})
//     } catch (error) {
//         return res.status(400).json({message: "An error occurred", error: error.message})
//     }
// }

exports.createOrder = async (req, res) => {
    try {
        const cart = await cartModel.findOne({user: req.user._id}).populate('items.product')

        if (!cart || cart.length === 0) {
            return res.status(400).json({message: "Cart is empty"})
        }
        let totalAmount = 0;

        for (const item of cart.items) {
            if (item.product.stock < item.qty) {
                return res.status(400).json({message: `Not enough stock for ${item.product.name}`})
            }
            totalAmount += item.product.price * item.qty;
            item.product.stock -= item.qty;
            await item.product.save();
        }
        const order = new orderModel({
            user: req.user._id,
            items : cart.items.map(i => ({
                product: i.product._id,
                qty : i.qty
            })),
            totalAmount
        });
        await order.save();
        await cartModel.findOneAndDelete({user: req.user._id})
        return res.status(200).json({message: "Order placed successfully", order})
    } catch (error) {
        return res.status(400).json({message: "An error occurred", error: error.message})
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        const allOrder = await orderModel.find().populate('user', 'firstName lastName email items')
        return res.status(200).json({message: "All orders", allOrder})
    } catch (error) {
        return res.status(400).json({message: "An error occurred", error: error.message})
    }
}