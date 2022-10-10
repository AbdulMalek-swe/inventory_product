const express = require("express");
const router = express.Router();
const supplierController = require("../controller/supplier.controller")
router
.route("/")
.get(supplierController.getSuppliers)
.post(supplierController.createSuppliers)

router
.route("/:id")
.get(supplierController.getSuppliersById)
.patch(supplierController.updateSuppliers)
 
module.exports=router;