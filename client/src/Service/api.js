import axios from "axios";

const url="http://localhost:8080";

export const addUser = async(data) =>{
    try {
       
       let response = await axios.post(`${url}/add`,data);
        return response.data;
    } 
    catch (error) {
        console.log("Error while calling  adding user api ");
    }
}

export const getUsers = async () => {
    try {
        let response = await axios.get(`${url}/users`);

        //console.log(response)

        return response.data;

    } catch (error) {
        console.log("Error while calling  get user api ");
    }
}

export const setConversation = async (data) =>{
    try {
        await axios.post(`${url}/conversation/add`,data);
    } catch (error) {
        console.log("Error while calling setConversetion  api ");
    }
}

export const getConversation  = async (users) =>{
    try {

        let response = await axios.post(`${url}/conversation/get`,users);
        
        return response.data;

    } catch (error) {
        console.log("Error while calling getConversetion  api ",error);
    }
}

export const newMessage = async (data) => {
    try {

        return await axios.post(`${url}/message/add`,data);

    } catch (error) {
        console.log("Error while calling newMessage api ",error);
    }
}

export const getMessage = async (id) => {
    try {
        
       let response = await axios.get(`${url}/message/get/${id}`)

       return response.data;

    } catch (error) {
        console.log("Error while calling getMessage api ",error);
    }
}

export const uploadFile = async(data) => {

    console.log(data);
    try {
        return await axios.post(`${url}/file/upload`,data); 
    } catch (error) {
        console.log("Error while calling upload file  api ",error.message); 
    }
}