//For the request body we are writing some validations here
// Request comes in
//       ↓
// checkSchema(schema) middleware runs
//   → validates req.body.name  → stores result on req
//   → validates req.body.price → stores result on req
//   → validates req.body.category → stores result on req
//       ↓
//  route handler runs
//   → validationResult(req)  → reads stored results →"any errors?"
//   → matchedData(req)       → reads stored results →"give me the valid {name, price, category}"

import { checkSchema } from "express-validator";
export const createItemValidationSchema = {

    name : {
        notEmpty:{
            errorMessage : "Item Name should not be empty"
        },
        isLength:{
            options:{min:3,max:10},
            errorMessage:"Length should be between 3 and 10"
        }
    },
    category:
    {
        notEmpty:{
            errorMessage : "Item category should not be empty"
        },
        isLength:{
            options:{min:3,max:10},
            errorMessage:"Length should be between 3 and 10"
        } ,  
        isString:{
            options:true,
            errorMessage :"Should be a string"
        }

    },
    price:
    {
        notEmpty:{
            errorMessage : "price should not be empty"
        }

    }
}