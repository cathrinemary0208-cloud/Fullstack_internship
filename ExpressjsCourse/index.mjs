//working with arrays and route parameters
import express from "express"

const app = express();

const PORT = 3000;
//defin
const users = [
    {"id":1,"user_name":"Cathy"},
    {"id":2,"user_name":"Rubena"},
    {"id":3,"user_name":"Jayanthi"},
    {"id":4,"user_name":"Lance"},
    {"id":5,"user_name":"Srinithi"},
    {"id":6,"user_name":"Nidiya"},
]

const products = [
    {"id":1,"product_name":"Soap"},
    {"id":2,"product_name":"Fan"},
    {"id":3,"product_name":"Washing machine"},
    {"id":4,"product_name":"Fridge"},
    {"id":5,"product_name":"Electric stove"},
    {"id":6,"product_name":"Mirror"},
]
app.get("/api/products",(req,res)=>
{
    const {query:{filter,value}} = req;
    console.log({filter,value})
    if(filter&&value)
    {
        //without return it may fall through and give error
        //filter is the property name ....
       return res.send(products.filter((product)=>String(product[filter]).toLowerCase().includes(value.toLowerCase())
        ))
    }
    res.send(products)
})
app.get("/api/users",(req,res)=>
{
    res.send(users)
})
app.get("/api/products/:id",(req,res)=>
{
    const id = parseInt(req.params.id);
    if(isNaN(id))
    {
        res.status(400).send({"Message":"Not a Number .Enter valid url"})
    }
    const product = products.find((product)=> product.id === id)
    if(product)
    {
        res.send(product)
    }
    res.status(404).send({"Message" :"Product not Found"})

})
//specifying the id in url
app.get("/api/users/:id",(req,res)=>
{
   const id = parseInt(req.params.id);
   //checking if the id is a string
   if(isNaN(id))
   {
      res.status(400).send({"Message" :"This is not a number"})
   }

    //finding the id in the users array
   const user = users.find((user)=>user.id === id)
   //if user present send it or ...
   if(user)
   {
     res.send(user)
   }
   res.status(404).send({"Message":"User not found "})
})

app.listen(PORT,()=>
{
    console.log(`Server is listening in port  in  ${PORT}`)
})

//Query parameters

//http://localhost:3000/api/products?filter=product_name&value=sh