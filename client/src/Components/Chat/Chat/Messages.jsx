import { Box, styled } from "@mui/material";
import ChatFooter from "./ChatFooter";
import { useContext, useEffect, useRef, useState } from "react";
import { AccountContext } from "../../../Context/AccountProvider";
import { getMessage, newMessage } from "../../../Service/api";
import ChatMessage from "./ChatMessage";

const Wrapper = styled(Box)`
background-image:url(${"https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"}); 
background-size:50%;
`

const Component = styled(Box)`
    height:80vh;
    overflow-y:scroll;
`

const Container = styled(Box)`
padding:2px 20px`

const Message = ({person ,conversation}) => {

    const [value,setValue] = useState('');

    const [messages,setMessages] = useState([]);

    const [file,setFile] = useState();//state for file to hold file

    const [image,setImage]= useState();

    //incoing message state
    const [incomingMessage,setIncomingMessage] = useState();

    const scrollRef = useRef();

    const {account , socket ,newMsgFlag ,setNewMsgFlag} = useContext(AccountContext);


    useEffect (()=>{
        //fetching message
        socket.current.on('getMessage', data => 
       {
        //new message incoming
        setIncomingMessage({
            ...data,
            createdAt: Date.now()
        })
       })
    })


    //fetching messages
    useEffect(()=>{
            const getMessageDetails = async () => {

                let data = await getMessage(conversation?._id)

                setMessages(data)

                //console.log(data);
            }

            //when conversation id is there then the function will call
          getMessageDetails();

    },[person._id,conversation?._id,newMsgFlag])

    useEffect(()=>{
            scrollRef.current?.scrollIntoView({ transition : "smooth"})
    },[messages])


    useEffect(()=>{
        incomingMessage && conversation?.members?.includes(incomingMessage.senderId) &&
        setMessages((prev) => [...prev , incomingMessage] )
    },[incomingMessage,conversation])

    const sendText = async(e) => {
        //checking which key is pressed
        const code = e.keyCode || e.which;

        if(code === 13) {

            let message = {}

            if(!file){
            message = {
                senderId: account.sub,
                receiverId:  person.sub,
                conversationId: conversation._id,
                type:"text",
                text: value,
            }
        }
        else{
            message = {
                senderId: account.sub,
                receiverId:  person.sub,
                conversationId: conversation._id,
                type:"file",
                text: image,
            }
        }
           console.log("messages "+message)

            //sending message to user
           socket.current.emit('sendMessage', message);
           
           //creating and calli api  saving message to our database
           await newMessage(message);


           //setting value empty
            setValue('');
            setFile();
            setImage('');
           setNewMsgFlag(prev => !prev)
        }
    }


    return(
        <Wrapper>
            <Component>
                {
                    messages && messages.map(message => (
                        <Container ref={scrollRef}>
                          <ChatMessage message={message}/>
                        </Container>
                    ))
                }
            </Component>
            <ChatFooter 
            sendText={sendText} 
            setValue={setValue}
            value={value} 
            file={file} 
            setFile={setFile} 
            setImage={ setImage}/>
        </Wrapper>
    )
}

export default Message;