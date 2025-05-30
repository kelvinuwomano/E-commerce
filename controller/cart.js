const cartModel = require("../model/cartModel");
const productModel = require("../model/productModel");



exports.addToCarts = async (req, res) => {
    try {
        const {productId, qty} = req.body;
        const product = await productModel.findById(productId);
        if (!product) return res.status(400).json({message: "Product Not found"});

        let cart = await cartModel.findOne({user: req.user._id});
        if (!cart) {
            cart = new cartModel({
                user: req.user._id,
                items: [{product: productId, qty}]
            });
        } else {
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId.toString());

            if (itemIndex > -1) {
                cart.items[itemIndex].qty += qty;
            } else {
                cart.items.push({ product: productId, qty})
            }
        }
        await cart.save();

        return res.status(200).json({message: "Added to cart successfully", cart})
    } catch (error) {
        return res.status(400).json({message: "An error occurred", error: error.message })
    }
}

exports.removeFromCarts = async (req, res) => {
    try {
        const {productId} = req.body;
        let cart = await cartModel.findOne({user: req.user._id});

        if (!cart) return res.status(400).json({message: "Cart not found"});
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId.toString());

        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1)
            await cart.save();
            return res.status(200).json({message: "Removed from cart", cart})
        } else {
            return res.status(400).json({message: "Product not found in cart"})
        }
    } catch (error) {
        return res.status(500).json({message: "An error occurred", error: error.message})
    }
} 