//Buffer and Streaming

//Dividing big data sets into chunks and loading it when needed eg-youtube 
/*A STREAM is a way to read or write data piece by piece
 instead of loading everything,which saves data
A BUFFER is a temporary chunk of memory that holds each piece of that
  data while we handle it */


const fs = require('fs')
const readStream = fs.createReadStream('./bufferData.txt',{encoding : "utf8"})
const writeStream = fs.createWriteStream("./cpBufferData.txt")
readStream.on('data',(buffer) =>
{
    writeStream.write("New Event ***********") 
    console.log(buffer)
    writeStream.write(buffer)

})

//to copy from a file use:
//readStream.pipe(writeStream);***************