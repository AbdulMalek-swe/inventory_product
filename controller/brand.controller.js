const {
    createBrandService,
    getBrandsService,
    getBrandByIdService,
    updateBrandService
} = require("../services/brand.service");
module.exports.getBrands = async (req, res, next) => {
    try {
        const result = await getBrandsService();
        res.status(200).json({
            status: "success",
            message: "successfully show data",
            data:result
        })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            status: "failed",
            message: "unsuccess added data"

        })
    }
}
module.exports.getBrandById = async (req, res, next) => {
    const {id} = req.params;
    try {
        const result = await getBrandByIdService(id);
        if(!result){
            res.status(400).json({
                status: "failed",
                message: "can not get data"
            })
        }
        res.status(200).json({
            status: "success",
            message: "successfully show data",
            data:result
        })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            status: "failed",
            message: "can not get data",
            errors:error.message

        })
    }
}
module.exports.createBrand = async (req, res, next) => {
    try {
        const result = await createBrandService(req.body);
        res.status(200).json({
            status: "success",
            message: "successfully added data",
            data:result
        })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            status: "failed",
            message: "unsuccess added data"
        })
    }
}
// update brand 
module.exports.updateBrand = async (req, res, next) => {
    const {id} = req.params;
    try {
        const result = await updateBrandService(id,req.body);
        if(!result.modifiedCount){
            res.status(400).json({
                status: "failed",
                message: "can not update data"
            })
        }
        res.status(200).json({
            status: "success",
            message: "successfully show data",
            data:result
        })
    } 
    catch (error) {
        console.log(error)
        res.status(400).json({
            status: "failed",
            message: "can not get data",
            errors:error.message

        })
    }
}
// delete modify count 