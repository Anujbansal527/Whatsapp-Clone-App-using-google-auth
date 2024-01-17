import { Box, Typography, styled } from "@mui/material";
import { useContext, useState } from "react";
import { AccountContext } from "../../../Context/AccountProvider";
import { getConversation, setConversation } from "../../../Service/api";
import { useEffect } from "react";
import { fromateDate } from "../../../Utils/common-utils";

const Component = styled(Box)`
    height: 45px;
    display: flex;
    padding: 13px 0;
    cursor: pointer;
`;

const Img = styled("img")({
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: '50%',
    padding: '0 14px'
})
 
const Container = styled(Box)`
display:flex;
`

const Timestamp = styled(Typography)`
font-size:12px;
margin-left:auto;
color:#0000099;
margin-right: 20px`

const Text = styled(Typography)`
font-size:14px;
color:rgba(0,0,0,0.6);
`

const ConversationChat = ({user}) => {

    const { setPerson,account,newMsgFlag } = useContext(AccountContext);

    const [message,setMessage] = useState({});

    useEffect(()=>{
        const getConversatioDetails = async () => {
            const data  = await getConversation({senderId : account.sub,receiverId: user.sub})
            setMessage({text:data?.message , timeStamp : data?.updateAt})
        }
        getConversatioDetails();
    },[newMsgFlag])


    const getUser = async() => {

        setPerson(user);

        //setting new conversation
        await setConversation({senderId:account.sub , reciverId: user.sub})
    }

    return(
        <Component onClick={()=>getUser()}>
            <Box>
                <Img src={user.picture} alt="profile" />
            </Box>

            <Box  style={{width:"100%"}}>
                <Container>
                    <Typography>{user.name}</Typography>
                     {
                        message?.text &&
                        <Timestamp>{fromateDate(message?.timeStamp)}</Timestamp>
                     }
                </Container>
                <Box>
                    <Text>{message?.text?.includes("localhost") ? "media" : message.text }</Text>
                </Box>    
            </Box>
        </Component>
    )
}

export default ConversationChat;