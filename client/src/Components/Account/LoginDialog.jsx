import { Box, List, ListItem, Typography, styled } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { qrCodeImage } from '../../Constants/data';
import {GoogleLogin} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { addUser } from '../../Service/api';
import { useContext } from 'react';
import { AccountContext } from '../../Context/AccountProvider';


const dialogStyle = {
    height:"80%",
    width:"55%",
    marginTop:"15%",
    maxWidth:"100%",
    maxHeight:"100%",
    boxShadow:"none", 
    overFlow:"hidden",
}

const Main = styled(Box)`
display:flex;
`

const Container1 = styled(Box)`
    padding:56px 0 56px 56px;
`

const QR = styled("img")({
    height : 256,
    width: 256,
    margin : "50px 0 0 50px",
})

const Title = styled(Typography)`
font-size:26px;
color:#525252;
font-weight:300;
font-family:"inherit";
margin-bottom:"25px";
`
const StyleList = styled(List)`
    & > li
    {
        padding:0;
        margin-top:15px;
        font-size:18px;
        line-height:28px;
        color:#4a4a4a;
    }
`

const LoginDialog = () => {

    const {setAccount} = useContext(AccountContext)

    const onLoginSucess = async(res) => {
        const decoded = jwtDecode(res.credential);
        //console.log("login sucess",decoded);
        setAccount(decoded);
        
        //calling api and giving data
        await addUser(decoded);
    }

    const onLoginError = (res) => {
       // console.log("login error",res);
    }

    return (
        <>
         <Dialog  
         open={true}
         PaperProps={{sx:dialogStyle}}
         hideBackdrop={true}
         >
           <Main>
                <Container1>
                    <Title>To use WhatsApp on Your Computer</Title>
                    <StyleList>
                        <ListItem>1. This is An Clone App Using MERN Stack</ListItem>
                        <ListItem>2. To create Your Account please Login</ListItem>
                        <ListItem>3. This app is worked on Socket.io websocket</ListItem>
                    </StyleList>
                </Container1>

                <Box style={{position:"relative"}}>
                    <QR src={qrCodeImage} alt={'image'}/>
                    <Box style={{position:"absolute" ,top:"50%", transform:"translateX(50%)"}}>
                        <GoogleLogin 
                            onSuccess={onLoginSucess}
                            onError={onLoginError}
                        />
                    </Box>
                </Box>
           </Main>
         </Dialog>
        </>
    );
}

export default LoginDialog;