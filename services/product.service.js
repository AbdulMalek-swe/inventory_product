const Brand = require("../model/Brand");
const Product = require("../model/Product")
// get service data 
exports.getProductService = async (filters, queries) => {
    const result = await Product.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.field)
        .sort(queries.sortBy)
    const totalProduct = await Product.countDocuments(filters);
    const page = Math.ceil(totalProduct / queries.limit);
    return {
        result,
        totalProduct,
        page
    };
}
// get product by using id 
exports.getProductServiceById = async (productId) => {
    const result = await Product.findOne({ _id: productId });
    return result;
}
// create service data 
exports.createProductService = async (data) => {
    let result;
    if (data?.length) {
        result = await Product.insertMany(data);
    }
    else {
      
        result = await Product.create(data);
        let { _id:productId,brand} = result;
       const res = await Brand.updateOne({_id:brand.id},{$push:{products:productId}}) 
    }
    return result;
}
// update product by id service 
exports.updateProductByIdService = async (data, productId) => {
    //    only number property update when using $inc
    // const result = await Product.updateOne({
    //     _id: productId
    //       },
    //     { $inc: data },
    //     { runValidators: true })
    // all data data property update 
    const product = await Product.findById(productId);
    const result = await product.set(data).save();
    return result;
}
// bulk update product service 
exports.bulkUpdateProductByIdService = async (product) => {
    //    only number property update when using $inc
      let products = [];
    product.ids.forEach(element => {
        products.push(Product.updateOne({
            _id: element.id
        }, { $set: element.data }, { runValidators: true }));
    });
    const result = await Promise.all(products)
    return result;
}

// create delete product by id 
exports.deleteProductByIdService = async (productId) => {
    console.log(productId);
    const result = await Product.deleteOne({ _id: productId });
    return result;
}
// bulk delete service product 
exports.bulkDeleteProductByIdService = async (productId) => {
    // console.log(productId);
    const result = await Product.deleteMany({ _id: productId });
    return result;
} 