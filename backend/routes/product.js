const express = require("express");
const router = express.Router();
const {upload} = require("../middleware/multer")
const asyncHandler = require("express-async-handler")
const {authRequired,hasRoles} =require("../middleware/auth");
const {getProductById,createProduct,updateProduct,uploadProductImage,updateProductImage,deleteProduct,} = require("../controllers/product");


router.post("/createProduct",authRequired,hasRoles("admin"),asyncHandler(createProduct))
router.get("/:id",asyncHandler(getProductById))
router.post("/updateProduct/:id",authRequired,hasRoles("admin"),asyncHandler(updateProduct))
router.post("/uploadImage/:id",authRequired,hasRoles("admin"),upload.single("image"),asyncHandler(uploadProductImage))


