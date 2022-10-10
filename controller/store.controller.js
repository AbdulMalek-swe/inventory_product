const {
     getStoreService,
      getStoreByIdService,
      createStoreService
     } = require("../services/store.service");

module.exports.getStore =async(req,res,next)=>{
      try {
        const result =await getStoreService();
        res.status(200).json({
         status: "succesfful",
         message: "get data",
         data:  result
       });
     }
     catch (error) {
       res.status(400).json({
         status: "failed",
         message: "get data is failed",
         result: error.message
       })
     }
}

module.exports.createStore =async(req,res,next)=>{
  
    try {
        console.log(req.body);
        const result =await createStoreService(req.body);
        res.status(200).json({
         status: "succesfful",
         message: "get data",
         data:  result
       });
     }
     catch (error) {
       res.status(400).json({
         status: "failed",
         message: "get data is failed",
         result: error.message
       })
     }
}
module.exports.getStoreById =async(req,res,next)=>{
  
    try {
        const {id} = req.params;
        const result =await getStoreByIdService(id);
        res.status(200).json({
         status: "succesfful",
         message: "get data",
         data:  result
       });
     }
     catch (error) {
       res.status(400).json({
         status: "failed",
         message: "get data is failed",
         result: error.message
       })
     }
}
