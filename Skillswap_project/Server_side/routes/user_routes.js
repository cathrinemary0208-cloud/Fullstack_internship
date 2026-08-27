import {Router} from "express"
import UserControllers from "../controllers/userController.js"

const {create_user,get_user,update_user,delete_user} = UserControllers
const route = Router()

route.post("/signup",create_user)

route.get("/:id",get_user)

route.patch("/:id",update_user)

route.delete("/:id",delete_user)

export default route