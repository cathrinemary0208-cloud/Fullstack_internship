import { Router } from "express"
import { getUserIndex } from "./middleware.js"
import { users } from "./constants.js"
import { checkSchema, validationResult, matchedData } from "express-validator"
import { createUserValidationSchema } from "./validation_Schemas.js"
import mongoose from "mongoose"
import user from "../mongoose_schema/user.js"
const router = Router()

mongoose.connect("mongodb://localhost/express")
.then(()=>console.log("DB Connected"))
.catch((err)=>console.log(`Error:${err}`))


// GET all users, with optional filter
router.get("/api/users", (req, res) => {
    const { query: { filter, value } } = req
    if (filter && value) {
        return res.send(users.filter((user) =>
                String(user[filter]).toLowerCase().includes(value.toLowerCase())
            )
        )
    }
    res.send(users)
})

// GET one user by id
router.get("/api/users/:id", getUserIndex, (req, res) => {
    const { id } = req
    const user = users.find((user) => user.id === id)
    if (!user) {
        return res.status(404).send({ "Message": "User not found" })
    }
    res.send(user)
})

// POST a new user
router.post("/api/users", checkSchema(createUserValidationSchema), async(req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.status(400).send({ error: result.array() })
    }

    const body = matchedData(req)
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
    // const newUser = { id: newId, ...body }
    // users.push(newUser)
    const newUser = new User(body);
    try
    {
      const savedUser = await newUser.save()
      return res.status(201).send(savedUser)
    }
    catch(err){
        console.log(err);
        return res.status(400).send({Msg:"Invalid User"})
    }
    //save is asynchrounous so we use await 
    
})

// PUT — full update of a user
router.put(
    "/api/users/:id",
    getUserIndex,
    checkSchema(createUserValidationSchema),
    (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).send({ error: result.array() })
        }

        const { userIndex, id } = req
        const body = matchedData(req)
        users[userIndex] = { id: id, ...body }
        res.send({ "Message": "User updated successfully!!!" })
    }
)

// DELETE a user
router.delete("/api/users/:id", getUserIndex, (req, res) => {
    const { userIndex } = req
    const deleted = users.splice(userIndex, 1)
    return res.send({ "Message": "Deleted successfully", user: deleted[0] })
})

export default router