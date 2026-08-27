import mongoose from "mongoose"
import dotenv from "dotenv"
const ConnectDB = (async ()=>{

    try
    {
        const conn = await mongoose.connect(process.env.MongoUri)
        console.log("Database Connected Successfully ....")
    }catch(error)
    {
       console.log(`${error.message}`)
    }
})

dotenv.config()

export default ConnectDB