const express = require('express');
const { addToCarts, removeFromCarts } = require('../controller/cart');
const { protect } = require('../middleware/authMiddle');


const cartRouter = express.Router();

cartRouter.post("/add-to-cart",  protect, addToCarts)
cartRouter.post("/remove-from-cart",  protect, removeFromCarts)






module.exports = cartRouter