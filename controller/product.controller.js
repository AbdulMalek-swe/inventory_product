const {
  getProductService,
  createProductService,
  deleteProductByIdService,
  updateProductByIdService,
  getProductServiceById,
  bulkDeleteProductByIdService,
  bulkUpdateProductByIdService
} = require("../services/product.service");
// get all product
exports.getProduct = async (req, res) => {
  try {
    console.log(req.query);
    let filters = { ...req.query };
    const excludeField = ["sort", "page", "limit"];
    excludeField.forEach(field => delete filters[field]);
    let filterString = JSON.stringify(filters);
    filterString  = filterString.replace(/\b(gt|lt|gte|lte)\b/g,match=>`$${match}`);
    filters = JSON.parse(filterString);
    let queries = {};
     if(req.query.field){
          const field = req.query.field.split(',').join(' ');
          queries.field = field;
     }
     if(req.query.sort){
      const sortBy = req.query.sort.split(',').join(' ');
      queries.sortBy=sortBy;
     }
     if(req.query.page){
      const {page=0,limit=10} = req.query;
      const skip = parseInt(page)*parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
     }
    const result = await getProductService(filters,queries);
    res.json({
      status: "succesfful",
      message: "get data",
      page:result.page,
      count: result.totalProduct,
      data: result.result
    });
  }
  catch (error) {
    res.status(400).json({
      status: "failed",
      message: "get data is failed",
      result: error.message
    })
  }
}
// get product by id 
exports.getProductById = async (req, res) => {
  try {
     const {id} = req.params;
    const result = await getProductServiceById(id);
    res.json({
      status: "succesfful",
      message: "get data",
      data:  result
    });
  }
  catch (error) {
    res.status(400).json({
      status: "failed",
      message: "get data is failed",
      result: error.message
    })
  }
}
// create product 
exports.createProduct = async (req, res) => {
  try {
    const result = await createProductService(req.body);
    res.status(200).json({
      status: "success",
      message: "insert data success",
      result: result
    });
  }
  catch (error) {
    res.status(400).json({
      status: "failed",
      message: "insert data is failed",
      result: error.message
    })
  }
}
// update product 
exports.updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await updateProductByIdService(data, id);
    res.status(200).json({
      status: "success",
      message: "update data success",
      result: result
    });
  }
  catch (error) {
    res.status(400).json({
      status: "failed",
      message: "update data is failed",
      result: error.message
    })
  }
}
// bulk updated product 
exports.bulkUpdateProductById = async (req, res) => {
  try {
    const result = await bulkUpdateProductByIdService(req.body);
    res.json({
      status: "success",
      message: "update data success",
      result: result
    });
  }
  catch (error) {
    res.status(400).json({
      status: "failed",
      message: "update data is failed",
      result: error.message
    })
  }
}

// delete product 
exports.deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteProductByIdService(id);
    console.log(result);
    if (!result.deletedCount) {
      res.status(400).json({
        status: "failed",
        message: "not valid id to delete ",
        result: error.message
      })
    }
    res.json({
      status: "success",
      message: "data delete successfull",
      result: result
    });
  }
  catch (error) {
    res.status(400).json({
      status: "failed",
      message: "not delete data",
      result: error.message
    })
  }
} 
// bulk delted product 
exports.bulkDeleteProductById = async (req, res) => {
  try {
    const result = await bulkDeleteProductByIdService(req.body.ids);
    if (!result.deletedCount) {
      res.status(400).json({
        status: "failed",
        message: "not valid id to delete ",
        result: error.message
      })  
    }
    res.json({
      status: "success",
      message: "data delete successfull",
      result: result
    });
  }
  catch (error) {
    res.status(400).json({
      status: "failed",
      message: "not delete data",
      result: error.message
    })
  }
}

// file upload code 
exports.fileUpload = async (req,res)=>{
  try{
   res.status(200).json({
    file:req.files,
    show:"http://localhost:5000/images/"+req.files[0].filename
   })
  }
  catch(error){

  }
}