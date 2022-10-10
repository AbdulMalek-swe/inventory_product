const Category = require("../model/Category")

exports.getCategoriesService = async()=>{
   const result = await Category.find({});
   return result;
}
exports.createCategoriesService = async(data)=>{
    const result = await Category(data).save();
    return result;
}