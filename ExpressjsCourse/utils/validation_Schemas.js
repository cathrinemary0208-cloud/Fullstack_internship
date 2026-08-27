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
            errorMessage :"Should be a string"
        }

    },
    price:
    {
        notEmpty:{
            errorMessage : "price should not be empty"
        },
        isFloat: 
        { options: { min: 0 },
         errorMessage: "Price must be a positive number"
         },
         toFloat: true,

    }
}

export const createUserValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: "User name should not be empty"
        },
        isLength: {
            options: { min: 3, max: 30 },
            errorMessage: "Length should be between 3 and 30"
        }
    },
    age: {
        notEmpty: {
            errorMessage: "Age should not be empty"
        },
        isInt: {
            options: { min: 1, max: 120 },
            errorMessage: "Age must be a whole number between 1 and 120"
        },
        toInt: true
    },
    email: {
        notEmpty: {
            errorMessage: "Email should not be empty"
        },
        isEmail: {
            errorMessage: "Must be a valid email address"
        }
    }
};