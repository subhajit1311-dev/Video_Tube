import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.models.js"
import { uploadOnCloudinary ,deleteFromCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { console } from "inspector";

const registerUser = asyncHandler( async (req,res)=>{
    // TODO
    const {fullName,email,username,password}=req.body;

    //validation
    if([fullName,username,email,password].some((field)=>field?.trim()===""))
    {
        throw new ApiError(400,"All fields are required")
    }
    const existedUser = await User.findOne({
        $or: [{username},{email}]
    })
    if(existedUser)
    {
        throw new ApiError(409,"User with email or username already exists")
    }
    //for checking avatar or coverImage is exist or not
    console.warn(req.files)
    const avatarLocalPath = req.files?.avatar?.[0]?.path
    const coverLocalPath = req.files?.coverImage?.[0]?.path

    if(!avatarLocalPath)
    {
        throw new ApiError(400,"Avatar file is missing")
    }
    // const avatar = await uploadOnCloudinary(avatarLocalPath)
    // let coverImage=""
    // if(coverLocalPath)
    //  coverImage = await uploadOnCloudinary(coverLocalPath)
    let avatar;
    try {
        avatar = await uploadOnCloudinary(avatarLocalPath)
        console.log("uploaded Avatar",avatar)
    } catch (error) {
        console.log("Error while uploading of avatar",error)
        throw new ApiError(500,"Failed to upload Avatar")
    }

    let coverImage;
    try {
        coverImage = await uploadOnCloudinary(coverLocalPath)
        console.log("uploaded coverImage",coverImage)
    } catch (error) {
        console.log("Error while uploading of coverImage",error)
        throw new ApiError(500,"Failed to upload coverImage")
    }

    
    //create user profile
    try {
        const user = await User.create({
            fullName,
            avatar:avatar.url,
            coverImage:coverImage?.url || "",
            email,
            password,
            username:username.toLowerCase()
        })
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )
    
        if(!createdUser)
        {
            throw new ApiError(500,"something went wrong while registering a user")
        }
        return res.status(201).json(new ApiResponse(200,createdUser,"user registered successfully"))
    } catch (error) {
        console.log("User Creation is failed")
        if(avatar)
        {
            await deleteFromCloudinary(avatar.public_id)
        }
        if(coverImage)
        {
            await deleteFromCloudinary(coverImage.public_id)
        }
        throw new ApiError(500,"something went wrong while registering a user and images were deleted")
    }

    
})

export {registerUser}