import { useContext, useEffect, useState } from "react";
import { getUsers } from "../../../Service/api";
import { Box, Divider, styled } from "@mui/material";
import ConversationChat from "./ConversationChat";
import { AccountContext } from "../../../Context/AccountProvider";

const Component = styled(Box)`
height:81vh;
overflow: overlay;`

const StyledDivider =styled(Divider)`
margin : 0 0 0 70px;
background-color:#e9edef;
opacity:0.6s;
`;

const Conversation = ({text}) => {


    const [users,setUser] = useState([]);

    const {account,socket,setActiveUsers} = useContext(AccountContext);

   
    useEffect(()=>{
        
        const fetchData = async() =>{
    
            let response = await getUsers();
    
            //filtering serach data
            const filterData = response.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));

            setUser(filterData); 
        }

        fetchData();
    },[text]);

    useEffect(()=>{
        //sending online user detail to server
        socket.current.emit('addUser', account);

        //fetching array of online users and setting to state
         socket.current.on("getUsers", users => {
            setActiveUsers(users);
        })
    },[account])
    //calling when new user logged in

    
    return(
        <Component>
            {
                users.map(user => (
                    user.sub !== account.sub &&
                    <>
                    <ConversationChat user={user}/>
                    <StyledDivider/>
                    </>
                ))
            }
        </Component>
        )
}

export default Conversation;