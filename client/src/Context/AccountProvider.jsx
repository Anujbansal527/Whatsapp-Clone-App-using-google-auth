
import {  createContext, useEffect, useRef, useState } from "react";

import { io } from "socket.io-client";

export const AccountContext = createContext(null);

const AccountProvider = ({children}) => {
  
    //account deatails availavable
    const [account ,setAccount] =  useState();

    //how many user are there information
    const [person ,setPerson] = useState({});

    //active users state who are online
    const [activeUsers,setActiveUsers] = useState([]);

    const [newMsgFlag,setNewMsgFlag] = useState(false);

    const socket = useRef();

    //for establishing connection
    useEffect(()=>{
        socket.current =  io ("ws://localhost:9000")
    },[])

   // console.log("account",account);
    return (
        
        <AccountContext.Provider value={{
                account,
                setAccount,
                person,
                setPerson,
                activeUsers,
                setActiveUsers,
                newMsgFlag,
                setNewMsgFlag,
                socket
        }}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider;