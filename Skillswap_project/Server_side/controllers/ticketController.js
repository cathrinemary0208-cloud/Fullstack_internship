import ticket from "../models/skillPosts.js"

const create_ticket = (async (req,res)=>{

    try
    {
        const newTicket = await ticket.create(req.body)
        return  res.status(201).send({Message:`New ticket created successfully ${newTicket}`})
    }catch(error)
    {
        return res.status(400).send(`message : ${error.message}`)
    }
    
})

const get_ticket = (async (req,res)=>{

    try
    {
        const getTicketById = await ticket.findById(req.params.id)
        if(!getTicketById)
        {
            return res.status(404).send("Ticket Not found")

        }
        else
        {
            return res.status(200).send(`${getTicketById}`)
        }
      
    } catch(error)
        {
            return res.status(400).send(`Message : ${error.message}`)
        }
})

const update_ticket = (async (req,res)=>
{
    try
    {
       const updateTicketById = await ticket.findByIdAndUpdate(req.params.id,req.body,{returnDocument :"after",runValidators :true})
    if(!updateTicketById)
    {
        return res.status(404).send("Ticket Not found")
    }
    else
        {
            return res.status(200).send(`${updateTicketById}`)
        }
    }catch(error)
        {
            return res.status(400).send(`Message : ${error.message}`)
        }
    
      
})

const delete_ticket = (async (req,res)=>{

    try
    {
       const deleteTicketById = await ticket.findByIdAndDelete(req.params.id)
       if(!deleteTicketById)
       {
          return res.status(404).send("Ticket Not found")
       }
        else
        {
            return res.status(200).send(`Ticket deleted Succesfully`)
        }
    }catch(error)
        {
            return res.status(400).send(`Message : ${error.message}`)
        }
})

const ticketControllers = {

    create_ticket,get_ticket,update_ticket,delete_ticket
}

export default ticketControllers