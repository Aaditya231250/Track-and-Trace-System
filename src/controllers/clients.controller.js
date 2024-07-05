import { asyncHandler } from "../utils/AsyncHandler.js"
import { APIError} from "../utils/APIError.js"
import { Client } from "../models/clients.models.js"
import { ApiResponse } from "../utils/APIResponse.js"

const generateAccessAndRefreshTokens = async(userId)=>{
    try{
        const user = await Client.findbyId(userId)
        const accessToken =  user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save()
        return {accessToken, refreshToken}
    }catch(error){
        throw new APIError(500 ,"Error generating access and refresh tokens")
    }
}

const registerUser = asyncHandler(async (req, res)=>{
    const {name, email, password, phone, address, segment} = req.body

    if (
        [name, email, password, phone, address, segment].some((field) => field?.trim() === "")
    ) {
        throw new APIError(400, "All fields are required")
    }

    const userExisted = await Client.findOne({ email })
    if (userExisted) {
        throw new APIError(409, "User already exists")
    }

    const user = await Client.create({
        name,
        email,
        password,
        phone,
        address,
        segment,
        //refreshToken
    })

    const createdUser = await Client.findbyId(user._id).select("- password -refreshToken")

    if (!createdUser) {
        throw new APIError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
    
})

export { registerUser }