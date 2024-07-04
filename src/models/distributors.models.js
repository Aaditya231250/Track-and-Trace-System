import mongoose, { Schema } from "mongoose";

const distributorSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
    },
    email: {
        type : String,
        required : true,
        unique : true,
    },
    client_ref: {
        type : Schema.Types.ObjectId,
        ref : 'Client',
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

module.exports = mongoose.Model('Distibutor', distributorSchema)