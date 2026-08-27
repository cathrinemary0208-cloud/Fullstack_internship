import mongoose from "mongoose"
import {Schema} from "mongoose"

export const ticket_schema = new Schema ( {
     user :{
             type : Schema.Types.ObjectId,
             ref:"User",
             required :true
           },
    offering :
    {
         type:String,
        required :true,
    },
    seeking :{
        
        type:String,
        required :true,
    },
    status :{
        type:String,
        required :true,
    },
    description :{

        type:String,
        required :true,
    }
},{timestamps :true})

const ticket = mongoose.model("ticket",ticket_schema) 
export default ticket