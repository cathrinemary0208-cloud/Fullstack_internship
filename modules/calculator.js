num1=10
num2 = 5
const add = (num1,num2) => {
    return num1+num2
}
const sub = (num1,num2) => {
    return num1-num2
}
const mul = (num1,num2) => {
    return num1*num2
}
//returning all the function using exports -Multiple
module.exports = {
    Addition :add,
    Subtraction:sub,
    Multiplication:mul
}