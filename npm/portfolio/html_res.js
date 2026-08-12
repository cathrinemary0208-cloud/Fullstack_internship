//Sending html page as a request 

const http = require('http');
const fs = require('fs')
const readStream = fs.createReadStream("./portfolio_sample.html",{encoding :"utf-8"})

const server = http.createServer((request,response)=>
{    //Since it exists inside the same folder the path stays blank
    let path = "";
    console.log("Request Made")
     console.log(request.url )
     response.setHeader("Content-type","text/html")
      
      if(request.url == "/portfolio" || request.url == "/")
      {
        response.statusCode = 200;
         path+="portfolio_sample.html"
         
      }
      else if(request.url == "/contact" || request.url == "/contact.html")
      {
         //Dont prefix it with a / it takes it as absolute path
           response.statusCode = 200;
          path+="contact.html" 
        
      }
      else
      {
        response.statusCode = 404;
        response.end("Page not found");
        return;
      }
      fs.readFile(path,(err,data)=>
    {
        if(err)
        {
            response.statusCode = 500;
            response.end(err.message);
        }
        else
        {
            response.end(data)
        }
    })
})
 server.listen(3000,'localhost',()=>{
        console.log("Server is listening......")
      })

 
