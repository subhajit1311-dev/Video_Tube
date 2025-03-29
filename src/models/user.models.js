import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:
        {
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
       fullName:{
            type:String,
            required:true,
            trim:true
       },
       avatar:{
        type:String, //cloudinary url
        required:true,
       },
       coverImage:{
        type:String,
        required:true
       },
       watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
       ],
       password:{
        type:String,
        required:[true,"password is required"]
       },
       refreshToken:{
        type:String
       }
    },{timestamps:true} // for createdAt and updatedAt datafield of datatype Date 
)

userSchema.pre("save",async function (next){

    if(!this.isModified("password")) return next()

    //password get encrypted at the time of update as well as when it is save for the first time
    this.password = bcrypt.hash(this.password,10)
    
    next()
})

userSchema.methods.isPasswordCorrect = async function(password)
{
    return await bcrypt.compare(password,this.password)
}

//	Generates a JWT token for authentication.
userSchema.methods.generateAccessToken = function(){
    //short lived access token
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username
    }, 
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRY});
}


userSchema.methods.generateRefreshToken = function(){
    //longer lived access token
    return jwt.sign({
        _id:this._id
    }, 
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRY});
}



export const User = mongoose.model("User",userSchema)