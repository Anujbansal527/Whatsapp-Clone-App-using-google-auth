import express from  "express";
import { addUser,getUsers } from "../Controllers/UserController.js";
import { getConversation, newConversation } from "../Controllers/ConversationController.js";
import { getMessage, newMessage } from "../Controllers/MessageController.js";
import { getImage, uploadImage } from "../Controllers/ImageController.js";
import upload from "../Utils/upload.js";

const route = express.Router();

route.post("/add",addUser);
route.get("/users",getUsers);

route.post("/conversation/add",newConversation);
route.post("/conversation/get",getConversation);

route.post("/message/add",newMessage);
route.get("/message/get/:id",getMessage);



route.post("/file/upload", upload.single('file'), uploadImage);
//center one is middleware


route.get("/file/:filename",getImage);

export default route;