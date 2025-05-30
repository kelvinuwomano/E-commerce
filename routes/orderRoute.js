const express = require('express');
const { createOrder, getAllOrders } = require('../controller/order');
const { protect, adminMiddleware } = require('../middleware/authMiddle');



const orderRouter = express.Router();

orderRouter.post("/create-order", protect, createOrder)
orderRouter.get("/all-order", protect, adminMiddleware, getAllOrders)





module.exports = orderRouter