import express from "express"

//Database
import connectDB from "./Database/db.js"

//Routes 

import user_route from "./routes/user_routes.js"
import ticket_route from "./routes/skillPost_routes.js"
import trade_route from "./routes/trade_routes.js"
import review_route from "./routes/review_routes.js"


import dotenv from "dotenv"

connectDB()
const app = express();

app.use(express.json())
app.use("/api/users", user_route)
app.use("/api/tickets", ticket_route)
app.use("/api/trades", trade_route)
app.use("/api/reviews", review_route)

dotenv.config()


app.listen(3000,()=>{
    console.log("Server is listening....");
})