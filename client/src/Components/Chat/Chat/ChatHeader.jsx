import { MoreVert, Search } from "@mui/icons-material";
import { Box, Typography, styled } from "@mui/material";
import { defaultProfilePicture } from "../../../Constants/data";
import { useContext, useEffect } from "react";
import { AccountContext } from "../../../Context/AccountProvider";

const Header = styled(Box)`
height:44px;
background:#ededed;
padding: 8px 16px;
display:flex;
align-items:center;
`

const Img = styled("img")({
    height:"40px",
    width:"40px",
    objectFit:"cover",
    borderRadius:"50%",
})


const Name = styled(Typography)`
margin-left:12px !important;
`

const Status = styled(Typography)`
margin-left:12px !important;
font-size:12px;
color:rgb(0,0,0,0.6);
`

const RightContainer = styled(Box)`
margin-left:auto;
& > svg{
    padding:8px;
    font-size:24px;
    color:#000;
}
` 

const ChatHeader =({person}) => {

    //fetching details of active users
    const {activeUsers} = useContext(AccountContext);

 

    //console.log(person)

    return(
        <Header>

            <Img src={person.picture} alt="profile"/>
            <Box>
                <Name>{person.name}</Name>
                <Status>{activeUsers?.find(user => user.sub === person.sub) ? "Online" : "Offline" }</Status>
            </Box> 

            <RightContainer>
                <Search/>
                <MoreVert/>
            </RightContainer>

        </Header>
    )
}

export default ChatHeader;