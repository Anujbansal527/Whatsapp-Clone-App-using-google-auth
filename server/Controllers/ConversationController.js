import Conversation from "../Models/Conversation.js";

export const newConversation = async(req,res) =>{

    try {
        const senderId = req.body.senderId;
        const reciverId = req.body.reciverId;

        //checking is exist or not 

        const exist = await Conversation.findOne({members:{$all: [reciverId,senderId]}});
                                                            //check is all exist or not
        if(exist){
            return res.status(200).json("conversation already exists")
        }
        
        const newConversation = new Conversation({
            members: [senderId,reciverId]
        })

        await newConversation.save();

        return res.status(200).json("conversation saved sucess")

    } 
    catch (error) {
        return res.status(500).json("error while creating new conversation"); 
    }
}

export const getConversation = async(req,res) => {
    try {

        const senderId = req.body.senderId;
        const reciverId = req.body.reciverId;


        let conversation =  await Conversation.findOne({members:{$all: [reciverId,senderId]}})
        
        return res.status(200).json(conversation);
    } 
    catch (error) {
        return res.status(500).json("error while getting new conversation"); 
    }
}