const express= require("express");

const productController= require("../controller/product.controller"); 
const authorization  = require("../middleware/authorization");
const upload = require("../middleware/uploader");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();
// image uploader try code 
   
  router.post('/file-upload',upload.array("img"),productController.fileUpload)
//   bulk update delete route 
 router
 .route("/bulk-update")
 .patch(productController.bulkUpdateProductById)
 router
 .route("/bulk-delete")
 .delete(productController.bulkDeleteProductById)
//  get create route 
router
 .route("/")
 .get(productController.getProduct)
 .post(verifyToken,authorization("admin","store-manager"), productController.createProduct)
//    id base route 
 router
 .route("/:id")
 .get(productController.getProductById)
 .patch(productController.updateProductById)
 .delete(productController.deleteProductById)
module.exports = router;