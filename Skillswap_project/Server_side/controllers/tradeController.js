import trade from "../models/Trade.js"

const create_trade = (async (req,res)=>{

    try
    {
        const newTrade = await trade.create(req.body)
        return  res.status(201).send({Message:`New trade created successfully ${newTrade}`})
    }catch(error)
    {
        return res.status(400).send(`message : ${error.message}`)
    }
    
})

const get_trade = (async (req,res)=>{

    try
    {
        const getTradeById = await trade.findById(req.params.id)
        if(!getTradeById)
        {
            return res.status(404).send("Trade Not found")

        }
        else
        {
            return res.status(200).send(`${getTradeById}`)
        }
      
    } catch(error)
        {
            return res.status(400).send(`Message : ${error.message}`)
        }
})

const update_trade = (async (req,res)=>
{
    try
    {
       const updateTradeById = await trade.findByIdAndUpdate(req.params.id,req,body,{new:true,runValidators :true})
    if(!updateTradeById)
    {
        return res.status(404).send("Trade Not found")
    }
    else
        {
            return res.status(200).send(`${getTradeById}`)
        }
    }catch(error)
        {
            return res.status(400).send(`Message : ${error.message}`)
        }
    
      
})

const delete_trade = (async (req,res)=>{

    try
    {
       const deleteTradeById = await trade.findByIdAndDelete(req.params.id)
       if(!deleteTradeById)
       {
          return res.status(404).send("Trade Not found")
       }
        else
        {
            return res.status(200).send(`Trade Deleted successfully`)
        }
    }catch(error)
        {
            return res.status(400).send(`Message : ${error.message}`)
        }
})

const tradeControllers = {

    create_trade,get_trade,update_trade,delete_trade
}

export default tradeControllers