//When we use large complicated data ,it is useful because it have tessted utility 
// functions and make certain operations easier

const http = require('http');
const _ = require('lodash');
const server  = http.createServer((request,response)=>
{
    console.log("Request Made .....")
    response.setHeader("Content-Type","text/html")
   
})
server.listen(3000,'localhost',()=>
{
    console.log("Server is listening")
    //Generate aa random number 
     console.log(_.random(10,100))
})
