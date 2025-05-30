const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateJwt");
const productModel = require("../model/productModel");




exports.createUser = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        const checkUser = await userModel.findOne({ email });
        if (!firstName || !lastName|| !email || !password) return res.status(400).json({message: "All fields required"})
        if (checkUser) return res.status(400).json({message: "User already exists"});
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({ firstName, lastName, email, password: hashPassword})
        return res.status(200).json({message: "User created succcessfully", newUser})
    } catch (error) {
        return res.status(500).json({message: "An error occurred", error: error.message})
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({ email })
        if (!user) return res.status(400).json({message: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Incorrect password"})
        
        const token = generateToken(user._id, user.role)
        
        return res.status(200).json({message: "Login successfully", user, token})
    } catch (error) {
        return res.status(500).json({message: "An error occurred", error})
    }
}

exports.toAdmin = async (req, res) => {
    try {
        const {userId} = req.body;

        const user = await userModel.findById(userId);
        if (!user) return res.status(400).json({message: "User not found"}) ;

        user.role = "admin";
        await user.save()
        
        return res.status(200).json({message: "Promoted to admin"});
    } catch (error) {
        return res.status(400).json({message: "An error occurred", error: error.message})
    }
};

// exports.updateUser = async (req, res) => {
//     try {
//       const userId = req.params.id;
//       const update = req.body;

//       const user = await userModel.findByIdAndUpdate( userId, update, {
//         new: true,
//         runValidators: true
//       });
//       if (!user) return res.status(400).json({message: "User not found"});

//       return res.status(200).json({message : "Updated successfully", user})
//     } catch (error) {
//         return res.status(500).json({message: "An error occurred", error: error.message})
//     }
// }

exports.getAllProduct = async (req, res) => {
    try {
        const allProduct = await productModel.find();
        return res.status(200).json({message: "All products", allProduct})
    } catch (error) {
        return res.status(500).json({message: "An error occurred", error: error.message})
    }
}


exports.getAllUser = async (req, res) => {
    try {
        const allUser = await userModel.find().select("-password");
        return res.status(200).json({message: "All users", allUser})
    } catch (error) {
        return res.status(500).json({message: "An error occurred", error: error.message})
    }
}

