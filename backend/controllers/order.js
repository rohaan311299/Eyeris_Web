const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

// protected route
// api/v1/orders/getAllOrders

exports.getAllOrders = async(req,res,next) => {
    const order = await Order.find()
    if(!order){
        return res.status(404).json({success:false,msg:"No orders"})
    }

    res.status(200).json({success:true,data:order})
}


exports.getPlacedOrderforAdmin = async(req,res,next) => {
    console.log("Hi")
    const orders = await Order.find({status:"initiated"})
    if(!orders){
        return res.status(200).json({success:true,msg:"No Placed Orders in the inventory"})
    }

    res.status(200).json({success:true,data:orders})
}


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

    return res.status(201).json({success:true,msg:"Order created successfully",data:order})
}

exports.AcceptOrder = async(req,res,next) => {
    const order = await Order.findById(req.params.id)

    if(!order){
        return res.status(404).json({success:false,msg:"No such Order"})
    }

    order.status = "placed"
    order.save();
    res.status(200).json({success:true,data:order})


}

