//File system

const fs = require('fs');
console.log(fs);

const err_msg = (succ_msg,err) => {
    if(err)
    {
        console.log(err.message)
    }
    else
    {
       console.log(succ_msg)
    }
}
//File already file exists it doesn't execute the if statement
if(!fs.existsSync('./fileSystem')) //Sysnchronous function 
{
    fs.mkdir('./fileSystem',(err) => {  //Asynchronous function 
        err_msg("Folder created successfully");
    })
    console.log("Hereeeee .....")  //prints first because mkdir is an asynchrounous function
} 


///To create a file and write in it 
//pass the relativepath/filename,text ,callback 
//This is an asynchrounous function

fs.writeFile('./fileSystem/sampleFile.txt','Hello,This is a sample text to check whether the writeFile method works!!!',(err) =>{
      err_msg("File created successfully");
})

//once the file is created we can run the prgm again with diff text or not it 
//doesn't show error it just overwrites 

//To READ the file


if(fs.existsSync('./fileSystem/sampleFile.txt'))
{
   fs.readFile('./fileSystem/sampleFile.txt',(err,data) =>
   {
        err_msg("File Read successfully");
   }
)
}
///To delete a file 

if(fs.existsSync('./fileSystem/sampleFile.txt'))
{
    fs.unlink('./fileSystem/sampleFile.txt' , (err) =>
{
     err_msg("File Deleted Successfully");
})
}

//To delete a folder 

if(fs.existsSync('./fileSystem/sampleFile.txt'))
{
    fs.rmdir('./fileSystem',(err) =>
    {
          err_msg("File Deleted Successfully");
    })
}