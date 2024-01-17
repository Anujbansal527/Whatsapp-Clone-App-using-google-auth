import { Box } from "@mui/material";
import ChatHeader from "./ChatHeader";
import Message from "./Messages";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../../Context/AccountProvider";
import { getConversation } from "../../../Service/api";



const CHatBox = () => {

    const {person,account} = useContext(AccountContext);
   //console.log(person)

   const [conversation,setConversation] = useState({});

   //setting conversation
   useEffect(()=> {

        const getConversationDetails = async () =>{
            
            let data = await getConversation({ senderId: account.sub, reciverId: person.sub })
            
            setConversation(data);
        }
        getConversationDetails();

        
   },[person.sub])

    return (
        <Box style={{ height : "75%"}}>
            <ChatHeader person={person}/>
            <Message  person={person} conversation={conversation}/>
        </Box>
    )
}

export default CHatBox;