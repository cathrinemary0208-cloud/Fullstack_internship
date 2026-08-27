import mongoose from 'mongoose'
import {Schema} from 'mongoose'
export const User_Schema = new Schema ({

    user_name :{
        type:String,
        required:true,
        unique:true
    },
    email :{
        type:String,
        required:true,
        unique:true
    },
    password :{

        type:String,
        required:true,
        select : false
    },
    location:{
        type :String
    },
    bio :{
        type :String,
        required :true,
        minlength :40,
        maxlength :200
    }
},{timestamps : true})

const User = mongoose.model("User",User_Schema);
export default User;

