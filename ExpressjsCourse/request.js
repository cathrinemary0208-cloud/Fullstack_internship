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
    return  res.send({ message: "Received", data: req.body });
})


app.listen(3000,()=>{
    console.log("Server is listening....")
})

