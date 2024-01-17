import LoginDialog from "./Account/LoginDialog";
import { AppBar, Box, Toolbar, styled } from "@mui/material";
import { useContext } from "react";
import { AccountContext } from "../Context/AccountProvider";
import ChatDialog from "./Chat/ChatDialog";

const LoginHeader = styled(AppBar)`
    background-color:#00bfa4;
    height:250px;
    box-shadow:none;
`

const Header = styled(AppBar)`
    background-color:#00A884;
    height:125px;
    box-shadow:none;
`

const Component = styled(Box)`
height:100vh;
background:grey;
`

const Messanger = () => {
    
    const {account} = useContext(AccountContext);
    
    return (
        <Component>
        {
            //if user logged in then open chat if not the login page 
            account ? 
            <>
                    <Header>
                    <Toolbar>

                    </Toolbar>
                    </Header>
                    <ChatDialog/>
            </> 
            :
            <>
                <LoginHeader>
                    <Toolbar>

                    </Toolbar>
                </LoginHeader>
                <LoginDialog/>
            </>
        }
            
        </Component>
    )
}

export default Messanger;  