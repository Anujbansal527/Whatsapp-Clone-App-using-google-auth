import { Box, Divider, Typography, styled } from "@mui/material";
import { emptyChatImage } from "../../../Constants/data";

const Component = styled(Box)`
background:#f8f9fa;
padding:30px 0 ;
text-align : center;
height:100%;
`


const Container = styled(Box)`
padding : 0 200px`

const Imagw = styled("img")({
width:400,
margin:100
})

const Title = styled(Typography)`
 font-size:32px;
 margin : 25px 0 10px 0;
 font-family:inherit;
 font-weight:300;
 color:#41525d;
`
const SubTitle = styled(Typography)`
    font-size: 14px;
    color: #667781;
    font-weight: 400;
    font-family: inherit;
`;

const StyledDivider = styled(Divider)`
    margin: 40px 0;
    opacity: 0.4;
`;


const EmptyChat = () => {
    return(
        <Component>
            <Container>
                <Imagw src={emptyChatImage} alt="Whatsapp image"/>
                <Title>Whatsapp Web Clone</Title>
                <SubTitle>Now Send And Receive Message without Keeping your Phone Online</SubTitle>
                <SubTitle>Use Whatsapp On Up To Multiple linked devices and 1 phone at same time</SubTitle>
                <StyledDivider />
            </Container>
        </Component>
    )
}

export default EmptyChat;