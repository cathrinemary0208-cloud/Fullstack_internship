//To create a server,send text and html file as response,redirect,set status Code using 
//Express js

const exp = require('express');
const app = exp()//Creates an express application
const path = require('path');


const projectRoot = path.join(__dirname, '..');
app.listen('3000',()=>{
    console.log("Server is listening from express....")
});
app.get("/",(req,res)=>
{
    res.send("Hello from express.........")
})

app.get("/index",(req,res)=>
{
   
    res.sendFile("portfolio/index.html",{root: projectRoot})
})

app.get("/skillswap",(req,res)=>
{
    res.sendFile("portfolio/skiillswap.html",{root:projectRoot})
})
app.get("/contact",(req,res)=>
{
    res.sendFile("portfolio/contact.html",{root: projectRoot})
})

app.use((req,res)=>{
    
    res.status(404).sendFile("./portfolio/Page_Not_Found",{root:__dirname})
})