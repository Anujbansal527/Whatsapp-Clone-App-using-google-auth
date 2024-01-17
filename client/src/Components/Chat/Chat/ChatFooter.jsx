import { AttachFile, EmojiEmotionsOutlined, Mic} from "@mui/icons-material";
import { Box, InputBase, styled } from "@mui/material";
import { useEffect } from "react";
import { uploadFile } from "../../../Service/api";

const Container = styled(Box)`
    height: 55px;
    background: #ededed;
    width: 97.5%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    &  > * {
        margin: 5px;
        color: #919191;
    }`;

const InputChat = styled(Box)`
background-color:white;
border-radius:18px;
width:calc(98% - 100px)
`

const InputField = styled(InputBase)`
width:100%;
padding:10px;
height:20px
padding-left:15px;
font-size:14px;
`

const ChatFooter = ({sendText , setValue ,value, file , setFile , setImage }) => {


    useEffect(() => {
        const getImage = async() => {
            if(file ){
                
                const data = new FormData();
                
                data.append("name",file.name);
                data.append("file",file);


               // console.log("get image data "+data)

                let response = await uploadFile (data);
                //console.log(response.data);
                setImage(response.data);
            }
        }

        getImage();

    },[file])

    const onFileChange = (e) => {
        //console.log(e);
        setFile(e.target.files[0]);
        setValue(e.target.files[0].name);
    }    

    return (
        <Container>

            <EmojiEmotionsOutlined/>

            <label htmlFor="fileInput">
                <AttachFile/>
            </label>

            <input 
                type="file"
                id="fileInput"
                style={{display:"none"}}
                onChange={(e)=>onFileChange(e)}
            />

            <InputChat>
                <InputField placeholder="Type A Message"
                    onChange={(e)=>setValue(e.target.value)}
                    onKeyPress={(e)=>sendText(e)}
                    value={value}
                />
            </InputChat>


            <Mic/>
        </Container>
    );
}
 
export default ChatFooter;