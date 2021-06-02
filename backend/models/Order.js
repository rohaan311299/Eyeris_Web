const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    }],
    status:{
        type:String,
        enum:["initiated","placed","canceled","completed"],
        default:"initiated",
        required:true,
    },
    modified:{
        type:Boolean,
        default:false
    },
    totalPrice:{
        type:Number
    },
    quantity:{
        type:Number
    },
    address:{
        type:String,
        maxlen:200
    },
    detailedorder:[{
        _id:false,
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref : "Product"
        },
        quantity:Number,
        price:Number,
        name:String,
        description:String
    }]

},{
    timestamps:true
})

module.exports = mongoose.model('Order',OrderSchema)