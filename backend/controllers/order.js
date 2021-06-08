const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const mongoose = require("mongoose");

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

//protected route
// api/v1/orders/getOrderById/:id

exports.getOrderById = async(req,res,next) => {
    const orderId = req.params.id;
    if(!orderId){
        return res.status(400).json({success:false,msg:"No order Id provided"})
    }
    const order = await Order.findById(orderId).populate("user");
    console.log(order.user._id)
    console.log(req.user._id)
    if(order.user._id.toString() != req.user._id.toString() ){
        return res.status(403).json({success:false,data:"Not allowed to acesss"})
    }

    if(!order){
        return res.status(404).json({success:false,data:`No product with id ${req.params.id}`})
    }
    order.user = order.user.getPublicProfile();
    res.status(200).json({success:true,data:order})
}


// protected route
// /api/v1/orders/createOrder

exports.createOrder = async(req,res)=>{
    const user = req.user._id;
    const {products,totalPrice,address,detailedorder} = req.body;
    if(products.length==0)return res.status(400).json({msg:"Empty cart"})
    const order = await Order.create({
        user:user,
        products,
        totalPrice,
        quantity:products.length,
        address:address,
        detailedorder:detailedorder,
    });

    const userdata = await User.findById(req.user._id)

    userdata.orders.push(order._id);
    userdata.cart = [];
    await userdata.save();

    return res.status(201).json({success:true,msg:"Order created successfully",data:order})
}

// protected route
// /api/v1/orders/AcceptOrder/:id

exports.AcceptOrder = async(req,res,next) => {
    const order = await Order.findById(req.params.id)

    if(!order){
        return res.status(404).json({success:false,msg:"No such Order"})
    }

    order.status = "placed"
    order.save();
    res.status(200).json({success:true,data:order})
}


// protected route
// /api/v1/orders/AcceptOrder/:id

exports.completeOrder = async(req,res,next) => {
    const order = await Order.findById(req.params.id)

    if(!order){
        return res.status(404).json({success:false,msg:"No such Order"})
    }

    order.status = "completed"
    order.save();
    res.status(200).json({success:true,data:order})
}


// protected route
// /api/v1/orders/getMyOrders
// provide jwt token

exports.getMyOrders = async(req,res,netx) => {
    orders = req.user.orders;
    if(!orders){
        return res.status(404).json({msg:"No orders"})
    }
    
    past_orders = await Order.find({_id:orders})
    res.status(200).json({success:true,data:past_orders})
}


// protected route 
// api/v1/updateOrder/:id
// to updateOrder the order


exports.updateOrder = async(res,req,next) => {
    var order = await Order.findById(req.params.id)

    if(!order){
        return res.status(404).json({success:false,data:`No order with ${req.params.id}`})
    }

    if(order.user.toString() != req.user._id.toString()){
        return res.status(403).json({success:false,data:`Not authorised route`})
    }

    if(order.status == "placed" || "completed" || "canceled"){
        return res.status(403).json({success:false,data:`Request ${req.params.id} cannot be modified`})
    }
    order = await Order.findByIdAndUpdate(req.user._id,req.body,{
        new:true,
        runValidators:true
    })

    res.status(200).json({success:true,data:order});

}

// protected route 
// api/v1/deleteOrder/:id
// to delete the order

exports.cancelOrder =  async (req,res,next) => {
    var order = await Order.findById(req.params.id)

    if(!order){
        return res.status(404).json({success:false,data:`No such order with id ${req.params.id}`})
    }

    if(order.user.toString()  !==  req.user._id.toString()){
        return res.status(403).json({success:false,data:`Not authorised route`})
    }

    if(order.status == "placed"){
        return res.status(403).json({success:false,data:`Request has been completed or rejected`})
    }

    order.status = "canceled";
    await order.save();

    res.status(200).json({success:false,data:`Order cancelled with id ${req.params.id}`})

}

exports.getAllCompletedOrders = async(req,res,next) => {
    let order = await Order.find({user:req.user._id})

    if(!order){
        return res.status(404).json({success:false,msg:"No order till now"})
    }

    let completed_order = order.filter(function (o) {
        return o.status == "completed";
    });

    console.log(completed_order);

    res.status(200).json({success:true,data:completed_order})
}

