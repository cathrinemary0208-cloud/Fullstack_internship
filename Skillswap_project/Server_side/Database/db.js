import mongoose from 'mongoose'
import dotenv from "dotenv"

const connectDB= (async ()=>{

    try
    {
        const conn = await mongoose.connect(process.env.Mongo_Uri)
        console.log(`Database connected Successfully ^.^ :${conn.connection.host}`)
    }catch(error)
     {
           
        console.error(`Error : ${error.message}`)
        process.exit(1)
    }
})

dotenv.config()
export default connectDB