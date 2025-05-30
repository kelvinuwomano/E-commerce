const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");


exports.protect = async (req, res, next) => {
    const token = req.header("Authorization");
    if(!token) return res.status(401).json({message: "Unauthorised"});

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id || decoded._id).select('-password')
        if (!user) return res.status(401).json({ message: "User not found" });

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({message: "Invalid token", error})
    }
}

exports.adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(401).json({message: "Access denied"})
    }
    next()
}