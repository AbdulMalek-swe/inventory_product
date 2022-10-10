const { 
    getSuppliersService, 
    createSuppliersService,
    updateSuppliersByIdService,
    getSuppliersServiceById,
 } = require("../services/supplier.service");

module.exports.getSuppliers = async (req, res, next) => {
    try{
      const result = await getSuppliersService();
      res.status(200).json({
          status: "success",
          message: "get data success",
          result: result
        });
  }
  catch(error){
      res.status(400).json({
          status: "failed",
          message: "get data is failed",
          result: error.message
        })
  }
  }
module.exports.createSuppliers = async (req, res, next) => {
    try{
    const result = await createSuppliersService(req.body);
    res.status(200).json({
        status: "success",
        message: "insert data success",
        result: result
      });
}
catch(error){
    res.status(400).json({
        status: "failed",
        message: "insert data is failed",
        result: error.message
      })
}
}
module.exports.getSuppliersById = async (req, res, next) => {
    try{
    const result = await getSuppliersServiceById(req.params.id);
    res.status(200).json({
        status: "success",
        message: "get data success",
        result: result
      });
}
catch(error){
    res.status(400).json({
        status: "failed",
        message: "searching data is failed",
        result: error.message
      })
}

}
module.exports.updateSuppliers = async (req, res, next) => {
    try{
      // console.log(req.body)
    const result = await updateSuppliersByIdService(req.body,req.params.id);
    res.status(200).json({
        status: "success",
        message: "update data success",
        result: result
      });
}
catch(error){
    res.status(400).json({
        status: "failed",
        message: "update data is failed",
        result: error.message
      })
}

}