//This files works on how we use routers and import middleware and constants from files 
//works on knowing the separation while working in big projects
import express from "express"
//importing the router
import itemRouter from "./utils/item_routes.js"
import userRouter from "./utils/user_routes.js"
const app = express()

app.use(express.json())  
app.use(itemRouter)
app.use(userRouter)

app.listen(3000, () => {
    console.log("Server is listening....")
})