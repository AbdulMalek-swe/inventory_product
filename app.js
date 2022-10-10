 const express = require('express');
 const cors = require("cors");
const app = express();
app.use(express.json()); 
app.use(cors())
app.use("/images",express.static("images"))
const productRoute = require('./routes/product.routes');
const brandRoute = require('./routes/brand.routes');
const categoryRoute = require('./routes/category.routes');
const storeRoute = require('./routes/store.routes');
const supplierRoute = require('./routes/supplier.routes');
const stockRoute = require('./routes/stock.routes');
const userRoute = require('./routes/user.routes');
 
  
    app.use("/api/v1/product",productRoute)
    app.use("/api/v1/brand",brandRoute)
    app.use("/api/v1/category",categoryRoute)
    app.use("/api/v1/store",storeRoute)
    app.use("/api/v1/supplier",supplierRoute)
    app.use("/api/v1/stock", stockRoute);
    app.use("/api/v1/user", userRoute);
 
module.exports = app;