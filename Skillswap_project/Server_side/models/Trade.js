import mongoose from "mongoose"
import {Schema} from "mongoose"

export const trade_schema = new Schema ({

    users :{
        user1: {
      type: Schema.Types.ObjectId,
      ref: 'User',        // must match the model name you used in mongoose.model('User', ...)
      required: true,
    },
    user2: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ticket: {
        type: Schema.Types.ObjectId,
        ref: 'ticket',
        required: true,
    },
    status : {
         type: String,
    enum: ['open', 'matched', 'completed'],
    default: 'open',
    }
    }
},{ timestamps: true })

const trade = mongoose.model("trade",trade_schema)

export default trade