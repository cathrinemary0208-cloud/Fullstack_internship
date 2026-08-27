import express from "express"
import ConnectDB  from "./db.js"
import mongoose from "mongoose"
import {students}  from "./model.js"
const app = express()
app.use(express.json())
ConnectDB()
app.get("/api/:id",(req,res)=>
{
    
    const student = students.findById(req.params.id)
     if(!student)
    {
      return res.status(404).send("Student Not found!!!")
    } 
    return res.send(`${student}`)

})

app.post("/api/create",(req,res)=>
{
    const newStudent = students.create(req.body)
    return res.status(201).json(`New Student created successfully : ${JSON.stringify(newStudent)}`)
})

app.delete("/api/delete",(req,res)=>{

    const deleteUserById = students.findByIdandDelete(req.params.id)
     if(!student)
    {
      return res.status(404).send("Student Not found!!!")
    } 
    return res.send(`Student deleted Successfully`)
})

app.listen(3000,()=>
{
    console.log("Server is listening .....")

})
