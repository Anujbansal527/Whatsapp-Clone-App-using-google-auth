import { Box, Typography, styled } from "@mui/material";
import GetApp  from "@mui/icons-material/GetApp";
import {fromateDate,downloadMedia} from "../../../Utils/common-utils"
import { useContext } from "react";
import { AccountContext } from "../../../Context/AccountProvider";
import { iconPDF } from "../../../Constants/data"

const Sender = styled(Box)`
background:#dcf8c6;
max-width:60%;
margin-left:auto;
padding:5px;
width:fit-content;
display:flex;
border-radius:10px;
word-break:break-word;
`

const Receiver = styled(Box)`
background:#ffffff;
max-width:60%;
padding:5px;
width:fit-content;
display:flex;
border-radius:10px;
word-break:break-word;
`

const Text = styled(Typography)`
font-size:14px;
padding:0 25px 0 5px;
`

const Time = styled(Typography)`
font-size:10px;
color:#919191;
margin-top:6px;
wrod-break:keep-all;
`

const ChatMessage = ({message}) =>{
    
    const {account } = useContext(AccountContext)
    


    return (
        <>
        {
            account.sub === message.senderId ? 
            <Sender>
            {
                message.type === "file" ? <ImageMessage message={message}/> : <TextMessage message={message} />
            }     
            </Sender>
            :
            <Receiver>
            {
                message.type === "file" ? <ImageMessage message={message}/> : <TextMessage message={message} />
            }
            </Receiver> 
        }
        </>
    )
}

const ImageMessage = ({ message }) => {
    return(
        <Box style={{position:"relative"}}>
            {
                message?.text?.includes('.pdf') ?
                <Box style={{display:"flex"}}>
                    <img src={iconPDF} alt="pdf" style={{width:80,}}/>
                    <Typography>{message.text.split('/').pop()}</Typography>
                </Box>
                :
                <img style= {{ width:300, height: "100%" ,objectFit:"cover" }} src={message.text} alt={message.text}/>
            }
            <Time style={{position:"absolute" , bottom:0 , right: 0}}>
                <GetApp
                    onClick={(e)=>downloadMedia(e, message.text) }
                />
             {fromateDate(message.createdAt)}</Time>

        </Box>
    )
}

const TextMessage = ({ message })=>{
    return(
      <>
          <Text> {message.text} </Text>
                <Time> {fromateDate(message.createdAt)}</Time>
      </>
    )
}

export default ChatMessage;