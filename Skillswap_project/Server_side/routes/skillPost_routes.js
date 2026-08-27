import {Router} from "express"

const route = Router()

import UserControllers from "../controllers/ticketController.js"

const {create_ticket,get_ticket,update_ticket,delete_ticket} = UserControllers

route.post("/create_ticket",create_ticket)

route.get("/:id",get_ticket)

route.patch("/:id",update_ticket)

route.delete(":id",delete_ticket)


export default route