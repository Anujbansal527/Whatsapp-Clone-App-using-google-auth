import { Server } from "socket.io";

const io = new Server (9000 , {
    cors : {
        origin: "http://localhost:3000",
    },
})

var users = [];

const addUser = (userData,socketId) =>{
 !users.some(user => user.sub === userData.sub) && users.push({ ...userData , socketId});

}

const getUser = (userId) => {
    return users.find(user => user.sub === userId);
}

io.on('connection', (socket) => {
    console.log("Connected");

    socket.on("addUser",userData => {
        addUser(userData,socket.id);

        //sending online user info to frontend client
        io.emit("getUsers",users);
    });

    //sending message to the user 
    socket.on("sendMessage",(data) => {
        //fetching reciver id 
        const userId = data.receiverId;
        //fetching user to send message
        const user = getUser(userId);

        //to send message to the getted user
         io.to(user.socketId).emit('getMessage', data)
    })

})