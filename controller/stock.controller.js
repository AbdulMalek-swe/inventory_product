const { getStockService,
    createStockService,
    getStockServiceById }
    = require("../services/stock.service");


module.exports.getStock = async (req, res, next) => {
    try {
        
    
        let filters = { ...req.query };
        const excludeFields = ['sort', 'page', 'limit']
        excludeFields.forEach(field => delete filters[field])
    
        //gt ,lt ,gte .lte
        let filtersString = JSON.stringify(filters)
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
    
        filters = JSON.parse(filtersString)
    
        const queries = {}
    
        if (req.query.sort) {
          // price,qunatity   -> 'price quantity'
          const sortBy = req.query.sort.split(',').join(' ')
          queries.sortBy = sortBy
          console.log(sortBy);
        }
    
        if (req.query.fields) {
          const fields = req.query.fields.split(',').join(' ')
          queries.fields = fields
          console.log(fields);
        }
    
        if (req.query.page) {
    
          const { page = 1, limit = 10 } = req.query;
    
          const skip = (page - 1) * parseInt(limit);
          queries.skip = skip;
          queries.limit = parseInt(limit);
    
        }
    
        const stocks = await getStockService(filters, queries);
        // console.log(stocks);
        
        res.status(200).json({
          status: "success",
          data: stocks,
        });
      } catch (error) {
        res.status(400).json({
          status: "fail",
          message: "can't get the data",
          error: error.message,
        });
      }
}
module.exports.createStock = async (req, res, next) => {
    try {
        const result = await createStockService(req.body);
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
module.exports.getStockById = async (req, res, next) => {
    try {
        const result = await getStockServiceById(req.params.id);
        res.status(200).json({
            status: "success",
            message: "get data success",
            result: result
        });
    }
    catch (error) {
        res.status(400).json({
            status: "failed",
            message: "searching data is failed",
            result: error.message
        })
    }

}
