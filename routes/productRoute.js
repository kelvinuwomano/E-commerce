const express = require('express');
const { createProduct, updateProduct, deleteProduct, getByCategory } = require('../controller/product');
const upload = require('../middleware/upload');
const { getAllProduct } = require('../controller/user');
const { protect, adminMiddleware } = require('../middleware/authMiddle');


const productRouter = express.Router();

productRouter.post("/create-product", upload.array('images', 5), protect, adminMiddleware, createProduct)
productRouter.put("/update-product/:id", upload.array('image', 5),protect, adminMiddleware, updateProduct)
productRouter.delete("/delete-product/:id", protect, adminMiddleware, deleteProduct)
productRouter.get("/category/:category", protect, getByCategory)
productRouter.get("/all-product", protect, getAllProduct)


module.exports = productRouter