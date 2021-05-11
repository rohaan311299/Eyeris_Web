const express = require('express');
const router = express.Router();
const {upload} = require("../middleware/multer")
const { createOrder,getAllOrders,getPlacedOrderforAdmin,AcceptOrder } = require('../controllers/order');
const asyncHandler = require("express-async-handler")
const {authRequired, hasRoles} =require("../middleware/auth");

router.post("/createOrder",authRequired("user"),asyncHandler(createOrder));
router.get("/getAllOrders",authRequired("admin"),hasRoles("admin"),asyncHandler(getAllOrders))
router.get("/getInitiatedOrders",authRequired("admin"),hasRoles("admin"),asyncHandler(getPlacedOrderforAdmin))
router.get("/AcceptOrder/:id",authRequired("admin"),hasRoles("admin"),asyncHandler(AcceptOrder))

module.exports = router