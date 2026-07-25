//require gets the files return values (exports) and runs the file once
const calc = require("./calculator")
const greet1 = require("./greetings")
const name = require("./user")
const Constants = require("./constants")
//Calling the greet function 
console.log(greet1("Cathy"))
//Calling the add function with property name
//  Addition and passing values 
console.log(calc.Addition(10,5))
console.log(calc.Subtraction(10,5))
console.log(calc.Multiplication(10,5))
console.log(Constants)