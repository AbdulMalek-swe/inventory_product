const Supplier = require("../model/Supplier");

exports.getSuppliersService = async()=>{
    const result = await Supplier.find({});
    return result;
 }
 exports.createSuppliersService = async(data)=>{
     const result = await Supplier(data).save();
     return result;
 }
 exports.getSuppliersServiceById = async (SupplierId) => {
    const result = await Supplier.findOne({ _id: SupplierId });
    return result;
}
 exports.updateSuppliersByIdService = async (data, SupplierId) => {
    //    only number property update when using $inc
    const result = await Supplier.updateOne({
        _id: SupplierId
          },
        data,
        { runValidators: true })
    // all data data property update 
    // console.log(data,SupplierId);
    // const Supplier = await Supplier.findById(SupplierId);
    // const result = await Supplier.set(data).save();
    // console.log(result);
    return result;
}