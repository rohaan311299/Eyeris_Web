const Product = require('../models/Product')

exports.getProductById = async(res,req,next) => {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({data:"No data"});
        }
        res.status(200).json({
            success:true,
            data:product
        })
}

exports.createProduct = async(res,req,next) => {
    const {name,quantity,description,category,price} = req.body;
    
    const product = await Product.create({name,quantity,description,category,price});
    res.status(201).json({
        success:true,
        id:product._id
    })
}
/**
 * 
 * @ROUTE {
 * @DESC upload product image 
 */
exports.uploadProductImage = async(req,res) =>{
    const file = req.file;
    const id = req.params.id;
    let productImage={
        contentType:file.mimetype,
        imageData:file.buffer
    }
    const product = await Product.findById(id);
    if(!product){
        return res.status(404).json({msg:"No product found"});
    }
    product.image = productImage;
    await product.save();
    return res.status(200).json({success:true,product:product});

}



exports.updateProduct = async(res,req,next) => {
    const products = await Product.findById(req.params.id)
    if(!products){
        return res.status(404).json({data:"Id not found"})
    }
    // No Need since protection middlware added
    // if(products.vendor.toString() != req.user._id.toString()){
    //     return res.status(200).json({success:false,data:"Not allowed to access the route"})
    // }

    const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        data:product
    })
}

exports.updateProductImage = async(req,res) =>{
    const file = req.file;
    const id = req.params.id;
    let productImage={
        contentType:file.mimetype,
        imageData:file.buffer
    }
    const product = await Product.findById(id);
    if(!product){
        return res.status(404).json({msg:"No product found"});
    }
    product.image = productImage;
    await product.save();
    return res.status(200).json({success:true,product:product});

}

exports.deleteProduct =async(res,req,next) => {
    const products = await Product.findById(req.params.id)
    if(!products){
        return res.status(404).json({data:"Id not found"})
    }
      // No Need since protection middlware added
    // if(products.vendor.toString() != req.user._id.toString()){
    //     return res.status(200).json({success:false,data:"Not allowed to access the route"})
    // }
    const product = await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success:true,
        msg:`Deletion succssfull`
    })

}