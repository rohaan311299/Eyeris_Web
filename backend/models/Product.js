const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add Product name']
    },
    quantity:{
        type:Number,
        required:[true,'Please Provide number of items']
    },
    description:{
        type:String,
        required:[true,'Please the description of the product'],
        maxlength:200
    },
    exp:{
        type:Date,
    },
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Admin"
    },
    category:{
        type:String,
        required:[true,'Please provide category']
    },
    image:{
        contentType:String,
        imageData:Buffer,
    },
    price:{
        type:Number,
        required:[true,'Please provide price']
    },

})

module.exports = mongoose.model('Product',ProductSchema)