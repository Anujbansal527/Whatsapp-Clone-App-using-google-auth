import express from "express";
import dotenv from "dotenv";
import Connection from "./Config/Database.js";
import Route from "./Routes/Route.js"
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());

app.use(bodyParser.json({extended:true}))

app.use(bodyParser.urlencoded({extended:true}))

app.use('/',Route);

Connection();

app.listen(PORT,()=>{console.log(`Server is running at port ${PORT}`)})