import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import {ApiRrsponse} from '../utils/ApiResponse.js'
const registerUser=asyncHandler(async(req,res)=>{
    const {fullname,email,username,password}=req.body;
   /* if(fullname==="")
        throw new ApiError(400,"fullname is required");*/
   if([fullname,email,username,password].some((field)=>field?.trim()===""))
   {
throw new ApiError(400,"All fields are required")
   }
   const existedUser=User.findOne({
    $or:[{username},{email}]
   })
if(existedUser)
    throw new ApiError(409,"Username or email alread exist");
})
const avatarLocalPath=req.files?.avatar[0]?.path;
const coverImageLocalPath=req.files?.coverImage[0]?.path;
if(!avatarLocalPath)
    throw new  ApiError(400,"Avatar is required");
const avatar=await uploadOnCloudinary(avatarLocalPath)
const  coverImage=await uploadOnCloudinary(coverImageLocalPath)
if(!avatar)
{
    throw new ApiError(400,"avatar file is required");
}
const user=await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url||"",
    email,
    password,
    username:username.toLowerCase()
})
const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
)
if(!createdUser)
    throw new ApiError(500,"Something went wrong while registering in database")
return res.status(201).json(
    new ApiResponse(200,createdUser,"user Registered successfully!!")
)
export {registerUser}
//asking registration details from user(frontend)
//validation-not empty
//check if the user already exist:username or email
//check for images,check for avatar
//upload them to cloudinary,avatar
//create user object-create entry in db
//remove password and refresh token field from response
//check for user creation
//return res
