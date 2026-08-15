//Sending data ffrom frontend to backend is callled post request
import express from "express"

const app = express()


const items = [
  { id: 1, name: "Notebook", category: "Stationery", price: 3.5 },
  { id: 2, name: "Pen", category: "Stationery", price: 1.2 },
  { id: 3, name: "Water Bottle", category: "Accessories", price: 8.0 },
  { id: 4, name: "Umbrella", category: "Accessories", price: 12.99 },
  { id: 5, name: "Table Fan", category: "Appliances", price: 22.5 }
];


app.get("/api/items",(req,res)=>
{
    const {query:{filter,value}} = req
    if(filter&&value)
    {
      return res.send(items.filter((item) => String(item[filter]).toLowerCase().includes(value.toLowerCase())));
    }
    res.send(items)
    
})

app.get("/api/items/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    console.log(id)
    if(isNaN(id))
    {
       return res.status(404).send({"Message":"Not a Number"})
    }
    const item = items.find((item)=>item.id===id)
       res.send(item)

})

app.use(express.json()); //middleware to convert it as a json file

// Reads the incoming raw request stream
// Parses it as JSON
// Attaches the result to req.body
// Calls next() so your route handler can then use req.body

app.post("/api/items_",(req,res)=>
{
    console.log(req.body)
    const {body} = req
    const newUser = {id:items[items.length-1].id+1,...body}
    items.push(newUser)
    console.log("Array length after push:", items.length)   
    console.log(items)   
    return res.status(201).send(newUser)
})
//PUT request - to update completely 
app.put("/api/items/:id",(req,res)=>
{
    const id = parseInt(req.params.id)
    if(isNaN(id))
    {
        return res.send({"Message":"Bad Request ,Invalid ID!!!"})
    }
    const itemIndex = items.findIndex((item)=>items.id===id)
    if(items(itemIndex)===-1)
    {
       return  res.status(404).send({"Message":"User not found!!!"})
    }
     const {body} = req;
      res.send({id : items[itemIndex],...body})
     console.log(items)
})

app.listen(3000,()=>{
    console.log("Server is listening....")
})

