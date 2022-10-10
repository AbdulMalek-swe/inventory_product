const express = require("express");
const brandController = require("../controller/brand.controller");
const router = express.Router();
//  brand get and update data 
router
  .route("/")
  .get(brandController.getBrands)
  .post(brandController.createBrand)
  // get product using brand id 
  router
  .route("/:id")
  .get(brandController.getBrandById)
  .patch(brandController.updateBrand)
 
module.exports = router;