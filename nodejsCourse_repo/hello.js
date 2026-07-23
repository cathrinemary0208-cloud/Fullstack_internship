console.log("Hello,World")
console.log("This is my first node js code")

//simple function to print a name

const name_func = (name) => {
    console.log(`Hello , Iam ${name}`)
}
name_func("rcm")
//console.log(window)
//Global object -like window in browser  
console.log(global)

setTimeout(() => { 
    console.log("This is a timeout function");
    clearInterval(intfunc);
},5000) 
//after 5s it stops the interval - clearInterval
const intfunc = setInterval(() => {
    console.log("This is a Interval Function ")
    
},1000)
//To find the location 
console.log(__dirname);
console.log(__filename)