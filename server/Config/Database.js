import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URL;

const Connection = async() =>{
    try {
         const connection = await mongoose.connect(DB_URL , {

         })
         console.log("Sucessfully connect with database");

    } catch (error) {
        console.log("Error while connecting database",error.message);    
    }
}

export default Connection;