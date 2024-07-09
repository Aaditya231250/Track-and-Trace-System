import { asyncHandler } from "../utils/AsyncHandler.js"
import { APIError} from "../utils/APIError.js"
import { Client } from "../models/clients.models.js"
import { ApiResponse } from "../utils/APIResponse.js"

const generateAccessAndRefreshTokens = async(userId)=>{
    try{
        const user = await Client.findById(userId)
        const accessToken =  user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save().catch((err) => console.log(`Error is ${err}`))
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

    if (user && user._id) { // Check if user and user._id exist
        const createdUser = await Client.findById(user._id).select("-password -refreshToken");
        if (!createdUser) {
            throw new APIError(500, "Something went wrong while registering the user");
        }
        return res.status(201).json(
            new ApiResponse(200, createdUser, "User registered Successfully")
        );
    } else {
        // Handle the case where user creation failed
        throw new APIError(500, "Failed to create user"); 
    }
    
})

const loginUser = asyncHandler(async (req, res)=>{

    const {email, password} = req.body

    if ([email, password].some((field) => field?.trim() === "")) {
        throw new APIError(400, "All fields are required")
    }
    
    const user = await Client.findOne({email})

    if(!user){
        throw new APIError(404, "User not found")
    }

    const isPasswordValid = user.matchPassword(user.password)

    if(!isPasswordValid){
        throw new APIError(401, "Invalid credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedinUser = await Client.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("AccessToken", accessToken, options)
    .cookie("RefreshToken", refreshToken, options)
    .json(new APIError(201, 
        {
            user : loggedinUser, accessToken, refreshToken
        },
        "User logged in Successfully", 
        [])) 
});

const logoutUser = asyncHandler(async (req, res)=>{
    
    await Client.findByIdAndUpdate(
        req.user._id, 
        {
            $unset : {
                refreshToken : 1
            }
        },
        {
            new : true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("AccessToken", options)
    .clearCookie("RefreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})


export { registerUser, loginUser, logoutUser }