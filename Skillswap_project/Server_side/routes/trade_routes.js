import {Router} from "express"

import  UserControllers from "../controllers/tradeController.js"

const {create_trade,get_trade,update_trade,delete_trade} = UserControllers

const route = Router()

route.post("/trade",create_trade)

route.get("/:id",get_trade)

route.patch("/:id",update_trade)

route.delete(":id",delete_trade)

export default route