const express = require("express");
const router = express.Router();
const {upload} = require("../middleware/multer")
const asyncHandler = require("express-async-handler")
const {authRequired,hasRoles} =require("../middleware/auth");
const {getProductById,createProduct,updateProduct,uploadProductImage,updateProductImage,deleteProduct,getAllProducts} = require("../controllers/product");


router.get("/getAll",asyncHandler(getAllProducts))
router.get("/:id",asyncHandler(getProductById))
router.post("/createProduct",authRequired("admin"),hasRoles("admin"),asyncHandler(createProduct))
router.put("/updateProduct/:id",authRequired("admin"),hasRoles("admin"),asyncHandler(updateProduct))
router.post("/uploadImage/:id",authRequired("admin"),hasRoles("admin"),upload.single("image"),asyncHandler(uploadProductImage))
router.put("/updatePhoto/:id",authRequired("admin"),hasRoles("admin"),upload.single("image"),asyncHandler(updateProductImage))
router.delete("/delete/:id",authRequired("admin"),hasRoles("admin"),asyncHandler(deleteProduct));


module.exports = router;


