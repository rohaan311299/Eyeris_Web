const express = require('express');
const router = express.Router();
const {upload} = require("../middleware/multer")
const { createOrder} = require('../controllers/order');
const asyncHandler = require("express-async-handler")
const {authRequired} =require("../middleware/auth");

router.post("/createOrder",authRequired("user"),asyncHandler(createOrder));

module.exports = router