//This file contains Custom middleware 
import {items} from "./constants.js"
export const getItemIndex = (req,res,next)=>{
    //getting the id from the parameter
    const id = parseInt(req.params.id)
     //checking if it is a number
    if(isNaN(id))
    {
        return res.status(404).send({"Message":"Bad Request ,Invalid ID"})
    }
    //obtaning the index based on parameter's id
    const itemIndex = items.findIndex((item)=>item.id===id)
    //checking if the item present
    if(items[itemIndex]==-1)
    {
        return res.status(404).send({"Message":"Item not found ,Try again"})
    }
    req.itemIndex = itemIndex;
    req.id = id;
    next();
}
