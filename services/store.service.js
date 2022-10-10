const Store = require("../model/Store")

exports.getStoreService = async()=>{
  const result = await Store.find({});
  return result;
}

exports.createStoreService = async(data)=>{
    const result = await Store(data).save();
    return result ;
  }

exports.getStoreByIdService = async(id)=>{
    const result = await Store.findOne({_id:id});
    return result;
  }