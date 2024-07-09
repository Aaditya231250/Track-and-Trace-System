import { APIError } from "../utils/APIError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { Client } from "../models/clients.models.js";
import mongoose from "mongoose";

export const verifyJWT = asyncHandler(async(req, res, next) =>{
    try {
        const token = req.cookies?.AccessToken || req.header("Authorization")?.replace("Bearer ", "")

        if(!token){
            APIError(401, "Unauthorized request")
        }

        const decoded_token = jwt.verify(token, process.env.ACCESS_TOKEN_CODE);

        const user = await Client.findOne({_id : decoded_token._id}).select("-password -refreshToken")

        if(!user){
            throw new APIError(400, "Invalid Accesss Token")
        }

        req.user = user
        next()
    } catch (error) {
        throw new APIError(401, "Invalid Access Token")
    }
})