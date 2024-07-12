import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
    password : {
        type : String,
        required : true,
    },
    phone: {
        type : String,
        required : true
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

distributorSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
}) 

const Distributor = mongoose.model('Distributor', distributorSchema)

export { Distributor }

