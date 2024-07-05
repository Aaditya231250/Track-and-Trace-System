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

const loginUser = asyncHandler(async (req, res)=>{

    const {email, password} = req.body

    if ([email, password].some((field) => field?.trim() === "")) {
        throw new APIError(400, "All fields are required")
    }
    
    const user = await user.findOne({email})

    if(!user){
        throw new APIError(404, "User not found")
    }

    const isPasswordValid = user.matchPassword(password)

    if(!isPasswordValid){
        throw new APIError(401, "Invalid credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("AccessToken", accessToken, options)
    .cookie("AccessToken", accessToken, options)
    .json(new APIError(201, "User logged in Successfully"))
    
 
});

export { registerUser, loginUser }