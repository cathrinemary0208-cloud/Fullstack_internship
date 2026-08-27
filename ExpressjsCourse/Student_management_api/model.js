import mongoose from "mongoose"
import {Schema} from "mongoose"

export const student_Schema = new Schema ({

    Student_name : {
        type :String,
        trim: true,
        required :[true,"Name is required"]
    },
    Email :{
       type :String,
       required :true,
       unique :true,
        lowercase: true,
        trim: true,
         match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
         },
    Age :{
        type :Number ,
        required : true
    },
    Department : {
        type : String,
        required :[true,"Department is required"]
    },
    College : {
        type : String,
        required :[true,"College is required"]
    },
    CGPA :{
            type : Number ,
            required :[true,"CGPA is required"]
    },
    skills : {

           type : String,
           required :true,
           maxlength:70
    },
    phone_no :{
        type : Number,
        unique : true,
        required : true,
        match: [/^\d{10}$/]
    }
},{timestamps :true})

export const students = mongoose.model("students",student_Schema)
export default students