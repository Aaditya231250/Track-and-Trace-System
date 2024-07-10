import mongoose from "mongoose";

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
    password: {
        type : String,
        required : true,
        unique : false
    },
    phone: {
        type : String,
        required : true,
    },
    address: {
        type : String,
        required : true,
    },
    refreshToken: {
        type : String,
    }
}, 
{timestamps: true})

const Distributor = mongoose.model('Distributor', distributorSchema)

export { Distributor }

