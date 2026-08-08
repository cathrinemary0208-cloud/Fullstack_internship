const data = require("./tasks.json")
const fs = require("fs")
const readStream = fs.createReadStream("./tasks.json",{utf8:"encoding"})
const input = process.argv[2] //to get the task from terminal
const task = process.argv[3]
///Menu******

console.log("To view the file type list")
console.log("To delete the file type delete and the task")
console.log("To add the file type add and the task")
fs.existsSync("./tasks.json",(err)=>{
    console.log("File not found !!!")
})
if(input == "list")
{
    for(i=0;i<data.tasks.length;i++)
    {
        console.log(`${i+1} . ${data.tasks[i]}`)
    }
}
else if(input == "delete")
{
    //returns the index of the task after searching thw whole array
    let index = data.tasks.indexOf(task);
    if (index > -1) {
        //start at index ang remove one item
        data.tasks.splice(index, 1);
        //changing the changes in hard disk
        fs.writeFileSync("./tasks.json", JSON.stringify(data));
        console.log("Task deleted: " + task);
    } else {
        console.log("Task not found");
    }
}
else
{
    data.tasks.push(task)
    console.log("Task added Successsfully")
}
