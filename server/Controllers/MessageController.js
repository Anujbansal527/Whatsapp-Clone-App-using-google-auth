import Message from "../Models/Message.js"
import Conversation from "../Models/Conversation.js";

export const newMessage = async(req,res) => {
    try {
        
        const newMessage = new Message(req.body);

        //saving message data
        await newMessage.save();

        //saving latets message to our conversation
        await Conversation.findByIdAndUpdate(req.body.conversationId, {message: req.body.text}) 

        return res.status(200).json("message has been sent sucessfully");

    } catch (error) {
        return res.status(500).json(error) 
    }
}

export const getMessage = async(req,res) => {
    try {

        const message = await Message.find({conversationId: req.params.id })
        
        return res.status(200).json(message)
    } catch (error) {
        return res.status(500).json(error) 
    }
}