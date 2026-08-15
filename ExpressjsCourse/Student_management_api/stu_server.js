import express from "express"

const app = express()



let students = [
    {
        "dept_no": 1,
        "Name" : "Cathrine",
        "Age"  :  20,
        "Year"  : "UG 3rd year",
        "Department" : "BCA",
        "Fee Status" : "Not Paid"
    },
    {
        "dept_no": 2,
        "Name" : "Nidi",
        "Age"  :  19,
        "Year"  : "UG 2nd year",
        "Department" : "BCom.",
        "Fee Status" : "Paid"
    },
    {
        "dept_no": 3,
        "Name" : "Srinithi",
        "Age"  :  20,
        "Year"  : "UG 3rd year",
        "Department" : "BCA",
        "Fee Status" : "Paid"
    },
    {
        "dept_no": 4,
        "Name" : "Keerthana",
        "Age"  :  18,
        "Year"  : "UG 1st year",
        "Department" : "Chemistry",
        "Fee Status" : "Not Paid"
    },
    {   "dept_no": 5,
        "Name" : "Jessy",
        "Age"  :  21,
        "Year"  : "PG 1st year",
        "Department" : "BCA",
        "Fee Status" : "Not Paid"
    },
    {
        "dept_no": 6,
        "Name" : "Paartha",
        "Age"  :  17,
        "Year"  : "UG 1st year",
        "Department" : "BCA",
        "Fee Status" : "Not Paid"
    },
    {
        "dept_no": 7,
        "Name" : "Lance Brock Lesnar",
        "Age"  :  23,
        "Year"  : "PG 2nd year",
        "Department" : "CS",
        "Fee Status" : "Paid"
    },
]


app.get("/api/all_students",(req,res)=>
{
    return res.send(`The students are :${JSON.stringify(students)}`)
})

//To search students based on their course

app.use(express.json())
app.get("/api/students",(req,res)=>
{
    console.log(req.query)
    const {query:{filter,value}} = req;
    if(filter&&value)
    {
      return res.send(students.filter((student)=>String(student[filter]).toLowerCase().includes(value.toLowerCase())));
     
    }
    res.send("Cannot find the students in the course");

})

//fetch students based on their id

app.get("/api/students/:id",(req,res)=>
{
    console.log(req.params)
    const id = parseInt(req.params.id)
    if(isNaN(id))
    {
       return res.status(404).send({"Message":"Not a Number"})
    }
    const student = (students.find((stu)=>stu.dept_no===id))
     res.send(student)
})

app.listen(3000,()=>

{
    console.log("Server is listening .....")

})