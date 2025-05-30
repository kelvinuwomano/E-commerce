const productModel = require("../model/productModel");



exports.createProduct = async (req, res) => {
    try {
        const {name, description, price, stock, category} = req.body;

        const imagePaths = req.files.map(file => file.path);

    

        const product = await productModel.create({
            name,
            description,
            price,
            stock,
            category,
            image: imagePaths,
        });

        return res.status(201).json({message: "Created successfully", product})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: "An error occurred", error: error.message})
    }

}

exports.updateProduct = async (req, res) => {
    try {
        const {name, description, price, stock, category} = req.body;
        const product = await productModel.findById(req.params.id);

        if (!product) return res.status(400).json({message: "Product not found"})

        product.name = name || product.name;
        product.stock = stock || product.stock;
        product.price = price || product.price;
        product.description = description || product.description;
        product.category = category || product.category;

        if (req.file?.path) product.image = req.file.path
        
        const updated = await product.save();

        return res.status(200).json({message: "Updated", updated})
    } catch (error) {
        return res.status(500).json({message: "An error occurred", error: error.message})
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id)
        if(!product) return res.status(400).json({message: "Product not found"})

        return res.status(200).json({message: "Deleted successfully"})
    } catch (error) {
        return res.status(500).json({message: "An error occurred", error: error.message})
    }
}

exports.getByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const product = await productModel.find({ category });
        if (product.length === 0) return res.status(400).json({message: "No product found in this category"});

        return res.status(200).json({message: "product by category", product})
    } catch (error) {
        return res.status(500).json({message: "An error occurred", error: error.message})
    }
}