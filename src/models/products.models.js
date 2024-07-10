import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    Product : {
        type : String,
        required : true,
    },
    Details : {
        type : String,
        required : true,
    },
    Barcode_Data : {
        type : String,
        required : true,
    }
}, {timestamps:true})

const Product = mongoose.model('Product', productSchema);

export { Product };