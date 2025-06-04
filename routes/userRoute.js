const express = require("express")
const { createUser, login, toAdmin, updateUser, getAllProduct, getAllUser } = require("../controller/user")
const { protect, adminMiddleware } = require("../middleware/authMiddle")
const { getOneProduct } = require("../controller/product")


const userRouter = express.Router()

userRouter.post("/signup", createUser)
userRouter.post("/login", login)
// userRouter.put("/to-admin", adminMiddleware, toAdmin)
// userRouter.put("/update-user/:id",  protect, updateUser)
userRouter.get("/all-user", protect, adminMiddleware, getAllUser)
userRouter.get("/one-product/:productId", getOneProduct)
// userRouter.get("all-product", protect, getAllProduct)



module.exports= userRouter