import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
        username:{
            type:String,
            required:true,
            min:3,
            max:20,
            unique:true
        },
        email:{
            type:String,
            required:true,
            max:30,
            unique:true
        },
        password:{
            type:String,
            required:true,
            min:6
        },
        desc:{
            type:String,
            max:50
        },
        city:{
            type:String,
            max:50
        },
        from:{
            type:String,
            max:50
        },
        relationship:{
            type:Number,
            enum:[1,2,3]
        },
        profilePicture:{
            type:String,
            default:""
        },
        CoverPicture:{
            type:String,
            default:""
        },followers:{
            type:Array,
            default:[],
        },
        followings:{
            type:Array,
            default:[]
        },
        isAdmin:{
            type:Boolean,
            default:false,
        }
},{timestamps:true})
export default mongoose.model("User",UserSchema);