import { useContext, useState } from "react";
import { AccountContext } from "../../../Context/AccountProvider";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import {Chat as MsgIcon} from "@mui/icons-material";
import HeaderMenu from "./HeaderMenu";
import InfoDrawer from "../../Drawer/InfoDrawer";

const Component = styled(Box)`
display:flex;
height;44px;
background:#ededed;
align-item:center;
padding:8px 16px;
`

const Wrapper = styled(Box)`
margin-left:auto;

& > * {
    margin-left:2px;
    padding:8px;
    color:#000;
    };

& :first-child{
        font-size:22px;
        margin-right:8px;
        margin-top:3px;
    }
`

const Image = styled("img")({
    height : 40,
    width : 40,
    borderRadius:"50%"
})


const Header = () =>{

    const{account} = useContext(AccountContext);

    const [openDrawer,setOpenDrawer] = useState(false);

    const toggleDrawer = () => {
        setOpenDrawer(true);
    }

    return(
        <>
            <Component>
                <Image src={account.picture} alt="profile" onClick={()=>toggleDrawer()}/>
                <Wrapper>
                    <MsgIcon/>
                    <HeaderMenu setOpenDrawer={setOpenDrawer}/>
                </Wrapper>
            </Component>
            <InfoDrawer open={openDrawer} setOpen={setOpenDrawer}/>
        </>
    )
}

export default Header;