import mongoose  from "mongoose";
import {Schema} from "mongoose"
export const review_schema = new Schema ({

    trade :{
             type : Schema.Types.ObjectId,
             ref : "trade",
             required : true
    },
    reviewer :
    {
        type :Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    reviewee:
    {
         type :Schema.Types.ObjectId,
         ref : "User",
         required : true
    },
    comment :{
        type : String,
        required :true
    },
    rating :
    {
        type : Number ,
        required :true
    }

},{timestamps :true})

const review = mongoose.model("review",review_schema)

export default review