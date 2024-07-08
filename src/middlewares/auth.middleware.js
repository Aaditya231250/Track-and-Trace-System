import { APIError } from "../utils/APIError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { Client } from "../models/clients.models.js";

export const verifyJWT = asyncHandler(async(req, next) =>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "").trim()

        if(!token){
            APIError(401, "Unauthorized request")
        }

        const decoded_token = await jwt.verify(token, process.env.ACCESS_TOKEN_CODE)

        console.log(decoded_token)

        const user = await Client.findByID(decoded_token?._id).select("-password -refreshToken")

        if(!user){
            throw new APIError(400, "Invalid Access Token")
        }

        req.user = user
        next()
    } catch (error) {
        throw new APIError(401, "Invalid Access Token")
    }
})