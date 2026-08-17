//This files works on avoiding all the Redundant data
//using custom middleware 
//and also validation in express js - step1:install express validator( npm i express-validator)
//This files send cookies
import express from "express"
import { checkSchema,validationResult,matchedData } from "express-validator";
//importing the file 
import {createItemValidationSchema} from "./utils/validation_Schemas.js"
const app = express()

app.use(express.json()); //middleware to convert it as a json file

const items = [
  { id: 1, name: "Notebook", category: "Stationery", price: 3.5 },
  { id: 2, name: "Pen", category: "Stationery", price: 1.2 },
  { id: 3, name: "Water Bottle", category: "Accessories", price: 8.0 },
  { id: 4, name: "Umbrella", category: "Accessories", price: 12.99 },
  { id: 5, name: "Table Fan", category: "Appliances", price: 22.5 }
];

//Custom middleware 
const getItemIndex = (req,res,next)=>{
  
    //getting the id from the parameter
    const id = parseInt(req.params.id)
     //checking if it is a number
    if(isNaN(id))
    {
        return res.status(404).send({"Message":"Bad Request ,Invalid ID"})
    }
    //obtaning the index based on parameter's id
    const itemIndex = items.findIndex((item)=>item.id===id)
    //checking if the item present
    if(items[itemIndex]==-1)
    {
        return res.status(404).send({"Message":"Item not found ,Try again"})
    }
    req.itemIndex = itemIndex;
    req.id = id;
    next();
}


app.get("/api/items",(req,res)=>
{
    const {query:{filter,value}} = req
    if(filter&&value)
    {
      return res.send(items.filter((item) => String(item[filter]).toLowerCase().includes(value.toLowerCase())));
    }
    res.send(items)
    
})

app.get("/api/items/:id",getItemIndex,(req, res) => {
    const{id} = req;
    const item = items.find((item) => item.id === id)
    if (!item) {
        return res.status(404).send({ "Message": "Item not found" })
    }
    res.send(item)
})



// Reads the incoming raw request stream
// Parses it as JSON
// Attaches the result to req.body
// Calls next() so your route handler can then use req.body

app.post("/api/items_",checkSchema(createItemValidationSchema),(req,res)=>
{
    //Checking the result of check schema
    const result = validationResult(req);
    console.log(req)
    if(!result.isEmpty())
    {
        return res.status(400).send({error:result.array()})
    }
    const body = matchedData(req)
    console.log(req.body)
    const newUser = {id:items[items.length-1].id+1,...body}
    items.push(newUser)
    console.log("Array length after push:", items.length)   
    console.log(items)   
    return res.status(201).send(newUser)
})
//PUT request - to update completely 
app.put("/api/items/:id",getItemIndex,(req,res)=>
{
     const {itemIndex} = req;
     const {id} = req;
     console.log(itemIndex)
    //getting the body from request by destructuring  
     const {body} = req;
     //In the index we are updating the values
     items[itemIndex] = { id: id, ...body }
     res.send({"Message":"Item updated successfull!!!"})
})

//PATCH request - To partially update the data 
app.patch("/api/items/:id",getItemIndex,(req,res)=>
{
    const {itemIndex} = req;
    const {body} = req;
    //Already present data + The new data (body)
    items[itemIndex] = {...items[itemIndex],...body}
    res.send("Updated Successfully")
})

app.delete("/api/items/:id",getItemIndex,(req,res)=>
{
    const {itemIndex} = req;
    items.splice(itemIndex,1)
    return res.send({"Message":"Deleted successfully"})

})
app.listen(3000,()=>{
    console.log("Server is listening....")
})

