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

const Retailer = mongoose.Model('Retailer', retailerSchema)

export { Retailer }