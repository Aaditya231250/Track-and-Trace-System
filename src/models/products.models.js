import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    details : {
        type : String,
    },
    barcode_data : {
        type : String,
    }
}, {timestamps:true})

const Product = mongoose.model('Product', productSchema);

export { Product };