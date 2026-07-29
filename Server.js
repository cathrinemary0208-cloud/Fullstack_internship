const http = require('http');
//we are creating a server 
const server = http.createServer((request,response) => {
  console.log("Request made ...")
  console.log(request,response)
  console.log(request.url) //gives the url  ignoring the 3000
  console.log(request.method)//To know which type of request it is 

  //Sending a response we need to set response header 
  response.setHeader('Content-type','text/html');
  //writing the response 
  response.write('<h1>Hello,World ,this is my first server response</h1>');
  //we should end the response if not we wont get the output in the browser
  response.end();
  
}
)
//asking the server to listen to the request we have to make 
server.listen(3000,'localhost',()=>
console.log("Your server is listening ..."))

//http request and http response 

