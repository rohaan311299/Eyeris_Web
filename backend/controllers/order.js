const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

// protected route
// /api/v1/orders/createOrder

exports.createOrder = async(req,res)=>{
    const user = req.user._id;
    const {products,totalPrice,address} = req.body;
    if(products.length==0)return res.status(400).json({msg:"Empty cart"})
    const order = await Order.create({
        user:user,
        products,
        totalPrice,
        quantity:products.length,
        address:address
    });

    const userdata = await User.findById(req.user._id)

    userdata.orders.push(order._id);
    await userdata.save();

    return res.status(201).json({msg:"Order created successfully",data:order})
}

