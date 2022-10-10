const mongoose = require("mongoose");
const Stock = require("../model/Stock");
const ObjectId = mongoose.Types.ObjectId;
exports.getStockService = async (filters,queries) => {
    const stocks = await Stock.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy)

  const total = await Stock.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);

  return { total, count: stocks.length, page, stocks };
}
exports.createStockService = async (data) => {
    const result = await Stock(data).save();
    return result;
}
exports.getStockServiceById = async (StockId) => {
    const result = await Stock.findOne({ _id: StockId })
        .populate("store.id")
        .populate("suppliedBy.id")
        .populate("brand.id");
       return result;
}
