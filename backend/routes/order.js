const express = require('express');
const router = express.Router();
const {upload} = require("../middleware/multer")
const { createOrder,getAllOrders,getPlacedOrderforAdmin,AcceptOrder,getMyOrders,cancelOrder,getOrderById,updateOrder,completeOrder,getAllCompletedOrders } = require('../controllers/order');
const asyncHandler = require("express-async-handler")
const {authRequired, hasRoles} =require("../middleware/auth");

router.post("/createOrder",authRequired("user"),asyncHandler(createOrder));
router.get("/getOrderById/:id",authRequired("user"),asyncHandler(getOrderById))
router.get("/getAllOrders",authRequired("admin"),hasRoles("admin"),asyncHandler(getAllOrders))
router.get("/getInitiatedOrders",authRequired("admin"),hasRoles("admin"),asyncHandler(getPlacedOrderforAdmin))
router.get("/AcceptOrder/:id",authRequired("admin"),hasRoles("admin"),asyncHandler(AcceptOrder))
router.get("/CompleteOrder/:id",authRequired("admin"),hasRoles("admin"),asyncHandler(completeOrder))
router.get("/getMyOrders",authRequired("user"),asyncHandler(getMyOrders))
router.put("/updateOrder/:id",authRequired("user"),asyncHandler(updateOrder))
router.delete("/cancelOrder/:id",authRequired("user"),asyncHandler(cancelOrder))
router.get("/getAllCompletedOrders",authRequired("user"),asyncHandler(getAllCompletedOrders));

module.exports = router