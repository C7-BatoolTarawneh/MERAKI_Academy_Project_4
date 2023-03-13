import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import { UserContext } from '../../App'
import { Card, Image,Stack,Heading, Text,Divider,Button,ButtonGroup, CardBody, CardFooter } from '@chakra-ui/react'
import "./style.css";
import {TextField} from "@mui/material";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';




const CreateNewTweet = () => {

const [description , setDescription]=useState("")
const [image, setImage] = useState("");
const {token} = useContext(UserContext)
const [message, setMessage] = useState("")


const uploadImage = async()=>{
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "a1dhlskc");
  data.append("cloud_name", "dnpshl3op");
  
}

const handleCreateTweet = async ()=>{
  console.log(66);
try {
    const response = await axios.post(`http://localhost:5000/tweets/create`,
    {
        description,
        image,
    },
    {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
}})
setMessage(response.data.message)
    // console.log((response.data.message));
}
catch(error){
    setMessage(error.response.data.message)

}
}

  return (
    <div>
      <Card className='main-card' maxWidth={600}>
    <CardBody>
      
      <Stack mt='6' spacing='3'>
        <TextField
          multiline
          rows={4}
          placeholder= "Whats happening?!" 
          onChange={(e)=>{ setDescription(e.target.value)
          console.log(e.target.value);}}>
          
        </TextField>
        <Divider variant="inset" marginTop={"10px"}/>
        <Image
        src='fth'
        alt='bg'
        borderRadius='lg'
      />
        
        <Text color='blue.600' fontSize='2xl'>
        </Text>
      </Stack>
    </CardBody>
    <Divider />
    <CardFooter>
      {/* <ButtonGroup spacing='2'> */}
        <InsertPhotoIcon color="primary" fontSize="large" >
          
        </InsertPhotoIcon>
        <input
        accept="image/*"
        id="tweet-image-upload"
        type="file"
        
      />
        <InsertEmoticonIcon color="primary" fontSize="large">
         
        </InsertEmoticonIcon>

        <Button className='tweet-button' onClick={handleCreateTweet}>
          Tweet
        </Button>
      {/* </ButtonGroup> */}
    </CardFooter>
  </Card></div>
  )
}

export default CreateNewTweet