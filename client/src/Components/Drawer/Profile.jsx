
import { useContext } from "react";
import { AccountContext } from "../../Context/AccountProvider";
import { Box, Typography, styled } from "@mui/material";

const ImgCont = styled(Box)`
    display:flex;
    justify-content:center;
`

const ProfileImg = styled('img')({
width:200,
height:200,
borderRadius:"50%",
padding:"25px 0"
})

const Wrappper = styled(Box)`
background:#fff;
padding: 12px 30px 2px;
box-shadow:0 1px 3px rgba(0,0,0,0.08);
& :first-child{
    font-size:13px;
    color:#009688;
    font-weight:200;
};
& :last-child{
    margin:14px 0;
    color: #4a4a4a;
};
`

const DescBox = styled(Box)`
padding:15px 20px 28px 30px;
& > p {
    font-size:13px;
    color;#8696a0;
}
`

const Profile = () => {

    const {account} = useContext(AccountContext);

    return(
        <>
            <ImgCont>
                <ProfileImg src={account.picture} alt="profile"/>
            </ImgCont>

            <Wrappper>
                <Typography>Your Name</Typography>
                <Typography>{account.name}</Typography>
            </Wrappper>

            <DescBox>
                <Typography>
                    This is not your username or pin. This will be visible to your WhatsApp Contacts.
                </Typography>
            </DescBox>

            <Wrappper>
                <Typography>About</Typography>
                <Typography>Status for you</Typography>
            </Wrappper>
        </>
    )
}

export default Profile;