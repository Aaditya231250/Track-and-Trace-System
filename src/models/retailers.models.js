import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
        type: String
    }
}, 
{timestamps: true})

retailerSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
}) 

const Retailer = mongoose.model('Retailer', retailerSchema)

export { Retailer }