import { Router } from "express"
import { getItemIndex } from "./middleware.js"
import { items } from "./constants.js"
import { checkSchema, validationResult, matchedData } from "express-validator"
import { createItemValidationSchema } from "./validation_Schemas.js"

const router = Router()


router.get("/api/items", (req, res) => {
    const { query: { filter, value } } = req
    if (filter && value) {
        return res.send(
            items.filter((item) =>
                String(item[filter]).toLowerCase().includes(value.toLowerCase())
            )
        )
    }
    res.send(items)
})

router.get("/api/items/:id", getItemIndex, (req, res) => {
    const { id } = req
    const item = items.find((item) => item.id === id)
    if (!item) {
        return res.status(404).send({ "Message": "Item not found" })
    }
    res.send(item)
})

router.post("/api/items", checkSchema(createItemValidationSchema), (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.status(400).send({ error: result.array() })
    }
    const body = matchedData(req)
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
    const newItem = { id: newId, ...body }

    items.push(newItem)
    console.log("Array length after push:", items.length)
    return res.status(201).send(newItem)
})

router.put(
    "/api/items/:id",
    getItemIndex,
    checkSchema(createItemValidationSchema),
    (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).send({ error: result.array() })
        }

        const { itemIndex, id } = req
        const body = matchedData(req)
        items[itemIndex] = { id: id, ...body }
        res.send({ "Message": "Item updated successfully!!!" })
    }
)

router.patch("/api/items/:id",getItemIndex,(req,res)=>
{
    const {itemIndex} = req;
    const {body} = req;
    //Already present data + The new data (body)
    items[itemIndex] = {...items[itemIndex],...body}
    res.send("Updated Successfully")
})

router.delete("/api/items/:id", getItemIndex, (req, res) => {
    const { itemIndex } = req
    const deleted = items.splice(itemIndex, 1)
    return res.send({ "Message": "Deleted successfully", item: deleted[0] })
})

export default router