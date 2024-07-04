import mongoose from "mongoose";

const retailerSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
    },
    email: {
        type : String,
        required : true,
        unique : true,
    },
    parent_ref_id : {
        type : Schema.Types.ObjectId,
        ref : 'Distributor'
    },
    level : {
        level_no : Number,
        
    },
    password: {
        type : String,
        required : true,
        unique : true
    },
    phone: {
        type : String,
        required : true,
        unique : true
    },
    address: {
        type : String,
        required : true,
    }
}, 
{timestamps: true})

module.exports = mongoose.Model('Retailer', retailerSchema)