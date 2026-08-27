import {Router} from "express"

import UserControllers from "../controllers/reviewController.js"

const {create_review,get_review,update_review,delete_review} = UserControllers

const route = Router()

route.post("/review",create_review)

route.get("/:id",get_review)

route.patch("/:id",update_review)

route.delete("/:id",delete_review)


export default route