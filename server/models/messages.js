
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: String,
            required: true
        },

        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        message: {
            type: String
        }




    })

const Messages = mongoose.model('Message', messageSchema)
export default Messages;

