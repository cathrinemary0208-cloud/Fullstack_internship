import review from "../models/review.js"

const create_review = (async (req,res)=>{

    try
    {
        const newreview = await review.create(req.body)
        return  res.status(201).send({Message:`New review created successfully ${newreview}`})
    }catch(error)
    {
        return res.status(400).send(`message : ${error.message}`)
    }
    
})

const get_review = (async (req,res)=>{

    try
    {
        const getReviewById = await review.findById(req.params.id)
        if(!getReviewById)
        {
            return res.status(404).send("review Not found")

        }
        else
        {
            return res.status(200).send(`${getReviewById}`)
        }
      
    } catch(error)
        {
            return res.status(400).send(`Message : ${error.message}`)
        }
})

const update_review = (async (req,res)=>
{
    try
    {
       const updateReviewById = await review.findByIdAndUpdate(req.params.id,req,body,{new:true,runValidators :true})
    if(!updateReviewById)
    {
        return res.status(404).send("review Not found")
    }
    else
        {
            return res.status(200).send(`${updateReviewById}`)
        }
    }catch(error)
        {
            return res.status(400).send(`Message : ${error.message}`)
        }
    
      
})

const delete_review = (async (req,res)=>{

    try
    {
       const deleteReviewById = await review.findByIdAndDelete(req.params.id)
       if(!updateTicketById)
       {
          return res.status(404).send("Review Not found")
       }
        else
        {
            return res.status(200).send(`Review  deleted successfully`)
        }
    }catch(error)
        {
            return res.status(400).send(`Message : ${error.message}`)
        }
})

const reviewControllers = {

    create_review,get_review,update_review,delete_review
}

export default reviewControllers