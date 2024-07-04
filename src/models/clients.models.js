import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const clientsSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
    },
    email: {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
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
    },
    segment : {
        type : String,
        required : true,
    },
    refreshToken : {
        type : String
    }
}, 
{timestamps: true})

clientsSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
}) 

clientsSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

clientsSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_CODE,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXP
        }
    )
}

clientsSchema.method.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this.id,
        },
        process.env.REFRESH_TOKEN_CODE,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXP
        }
    )
}

const Client = mongoose.model('Client', clientsSchema);

export { Client };
