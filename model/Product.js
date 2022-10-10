const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;
const valid = require("validator");
const ProductSchema= mongoose.Schema({
    name: {  
        type: String,
        required: [true, "provide a valite name"],
        trim: true,
        unique: [true, "name must be unique"],
        lowercase: true,
        minLength: [4, "length must be 4 character"],
        maxLength: [100, "length not more than 100 character"]
    },
    description: {
        type: String,
        required: [true, "give some product description"]
    },

    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pcs", "bag"],
            message: "value must be {Value} psc/litre/kg"
        }
    },
    imageURLs:[ {
        type: String,
        required: true,
        validate: [valid.isURL, "wrong url"]
      }],
    // imageURLs: [{
    //     type: String,
    //     require: true,
    //     validate: {
    //         validator: (value) => {
    //             if (!Array.isArray(value)) {
    //                 return false;
    //             }
    //             value.forEach(url => {
    //                 if (!validator.isURL(url)) {
    //                     isValid = false;
    //                 }
    //             })
    //             return isValid;
    //         },
    //         message: "please provide validate image urls"
    //     }
    // }],
    
    category:{
        type:String,
        required:true
    },
    brand:{
        name:{
            type:String,
            required:true
        },
        id:{
            type:ObjectId,
            required:true,
            ref:"Brand"
        }
    }
}, {
    timestamps: true
});
ProductSchema
.pre('save',(next)=>{
    if(this.quantity==0){
        this.status="out-of-stock"
    }
    next()
})
const Product = new mongoose.model("Product", ProductSchema
);
module.exports = Product;