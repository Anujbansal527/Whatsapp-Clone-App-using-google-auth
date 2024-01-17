import { Box, Dialog, styled } from "@mui/material";
import Menu from "./Menu/Menu";
import EmptyChat from "./Chat/EmptyChat";
import CHatBox from "./Chat/ChatBox";
import { useContext } from "react";
import { AccountContext } from "../../Context/AccountProvider";


const Component = styled(Box)`
    display:flex;
`

const LeftComponent = styled(Box)`
    min-width:450px;
`

const RightComponent = styled(Box)`
    width:75%;
    min-width:300px;
    height:100%;
    border-left: 1px solid rgba(0,0,0,0.14);
`

const dialogStyle = {
    height:"95%",
    width:"100%",
    maxWidth:"100%",
    maxHeight:"100%",
    boxShadow:"none", 
    overFlow:"hidden",
    margin:"20px",
    borderRadius:0
}

const ChatDialog = () => {

    const { person } = useContext(AccountContext)

    return(
       <Dialog
        open={true}    
        PaperProps={{sx:dialogStyle}}
        hideBackdrop={true}
        maxWidth={'md'}
       >

       <Component>
            {/*left component*/}
            <LeftComponent>
                <Menu/>
            </LeftComponent>
            {/*Right component*/}
            <RightComponent>
                
                {
                    Object.keys(person).length ? <CHatBox/> : <EmptyChat/>
                }

            </RightComponent>

       </Component>

       </Dialog>
    );
}

export default ChatDialog;