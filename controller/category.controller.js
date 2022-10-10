const {
    getCategoriesService,
     createCategoriesService
} = require("../services/category.service")

module.exports.getCategories = async (req, res, next) => {
  try{
    const result = await getCategoriesService();
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
module.exports.createCategories = async (req, res, next) => {
    try{
    const result = await createCategoriesService(req.body);
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