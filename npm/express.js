//To create a server,send text and html file as response,redirect,set status Code using 
//Express js
//morgan - logs http request ie. http method,requested url,
// time taken to process the request,status code
const exp = require('express');
const app = exp()//Creates an express application
const path = require('path');
const morgan = require('morgan')
const projectRoot = path.join(__dirname, '..');//absolute path , go up one folder

app.use(morgan('dev'))


// app.use((req,res,next)=>
// {
//     console.log(req.host);
//     console.log(req.path);
//     console.log(req.method)
//     console.log("Middleware 1 Reached !!!")
//     next(); // without next it does not executes the next lines
// })

app.get("/",(req,res)=>
{
    res.send("Hello from express.........")
})

app.get("/index",(req,res)=>
{
   
    res.sendFile("portfolio/index.html",{root: projectRoot})
})


//if the url is index it stops here does not execute middleware 2 
// app.use((req,res,next)=>
// {
//     console.log("Middleware 2 Reached !!!")
//     next();
// })


app.get("/skillswap",(req,res)=>
{
    res.sendFile("portfolio/skiillswap.html",{root:projectRoot})
})

app.get("/contact",(req,res)=>
{
    res.sendFile("portfolio/contact.html",{root: projectRoot})
})

app.use((req,res)=>{
    
    res.status(404).sendFile("./portfolio/Page_Not_Found",{root:projectRoot})
})

app.listen('3000',()=>{
    console.log("Server is listening from express....")
});


//Browser -> Request -> Server (middleware)-> Response -> Browser

//we access the middleware using app.use()
//particularlly used for logger details-notes all the status,steps 
//middleware is to write this logger 