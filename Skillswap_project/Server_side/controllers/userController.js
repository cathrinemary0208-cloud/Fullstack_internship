import User from "../models/User.js"

 const create_user =  (async (req,res)=>{

    try{

        const newUser = await User.create(req.body)
        return res.status(201).send({Message : `User created successfully ${newUser}`})
    }catch(error)
    {
        return res.status(400).send({message : `${error.message}`})
    }
})

const get_user = (async (req,res)=>{

    try
    {

         const getUserById = await User.findById(req.params.id)
    if(!getUserById)
    {
       return  res.status(404).send({message: "User not found"})
    }
    else
    {
         return res.status(200).send(`${getUserById}`)
    }
    }catch(error)
    {
         return res.status(400).send({message : `${error.message}`})
    }
   
})

 const update_user = (async (req,res)=>{

    try
    {
        const updateUserById = await User.findByIdAndUpdate(req.params.id,req.body,{returnDocument :"after",runValidators : true})
        if(!updateUserById)
        {
             return res.status(404).send({message: "User not found"})
        }
        else
        {
             return res.status(200).send(`User updated successfully ${updateUserById}`)
        }
    }catch(error)
    {
         return res.status(400).send({message : `${error.message}`})
    }
    
})

 const delete_user = (async (req,res)=>
{
    try
    {
        const deleteUserById = await User.findByIdAndDelete(req.params.id)
    if(!deleteUserById)
    {
         return  res.status(404).send({message: "User not found"})
    }
    else
    {
         return res.status(200).send(`User deleted Successfully ...`)
    }
    }
    catch(error)
    {
         return  res.status(400).send({message : `${error.message}`})
    }
})

const UserControllers = {

    create_user,get_user,update_user,delete_user
}
export default UserControllers


