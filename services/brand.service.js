const Brand = require("../model/Brand")

exports.getBrandsService = async()=>{
    const result = await Brand.find({}).select('-products -suppliers');
    return result;
}
exports.getBrandByIdService = async(id)=>{
    const result = await Brand.findOne({_id:id});
    return result; 
}
exports.createBrandService = async(data)=>{
    const result = await Brand(data).save();
    return result;
}
exports.updateBrandService= async(id,data)=>{
    const result = await Brand.updateOne({_id:id},data,{
        runvalidators:true
    });
    return result;
}
