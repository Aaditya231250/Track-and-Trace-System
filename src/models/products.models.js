import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    company : {
        type : String,
        required : true
    },
    segment : {
        type : String,
        required : true,
    },
    match_percentage : {
        type : Number,
        required : true
    },
    barcode_data : {
        type : String,
        required : true,
    },

})

const Product = mongoose.model('Product', productSchema);

export { Product };