//This files works on how we use routers and import middleware and constants from files 
import express from "express"
import itemRouter from "./utils/item_routes.js"

const app = express()

app.use(express.json())  
app.use(itemRouter)

app.listen(3000, () => {
    console.log("Server is listening....")
})