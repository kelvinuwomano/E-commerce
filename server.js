const express = require("express");
const cors = require("cors");
const database = require("./config/db");
const app = express();
const morgan = require("morgan")
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoute");
const cartRouter = require("./routes/cartRoute");
require("dotenv/config")

const {PORT} = process.env;
console.log(PORT);
app.use(express.json())

const port = PORT;

database();
app.use(cors());
app.use(morgan("dev"))
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/order", orderRouter)
app.use("/api/cart", cartRouter)

app.listen(port, () => {
    console.log(new Date().toLocaleString(), port)
})
