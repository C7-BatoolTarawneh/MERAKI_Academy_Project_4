import React, { useState,useContext,useEffect } from "react";
import axios from "axios";
import {TextField, Button, Modal,Box } from "@mui/material";
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { UserContext } from "../../App";


const ReplyButton = ({tweet}) => {
    const { isLoggedIn, token,  } = useContext(UserContext);
    const {replyText,setReplyText} = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleModalOpen = () =>{
        setIsModalOpen(true)
    }

    const handleModalClose = () =>
    {
        setIsModalOpen(false)
    }
    const handleReplySubmit = async () =>{
        try{
            const response = await axios.post(`http://localhost:5000/replies/createReply/${tweet._id}`,
            {
                caption: replyText,
                 replyImage: "https://pbs.twimg.com/media/FqkcV2eXoAEReSr?format=png&name=900x900",
   
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            )
            if(response.data.success) {
                setReplyText("")
                setIsModalOpen(false)
        }

    } catch(error) {
    console.log(error);
    }
}

  return (

    <div>
       <ChatBubbleOutlineRoundedIcon onClick={handleModalOpen} />
       <Modal open={isModalOpen} onClose={handleModalClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
                         <TextField
                label="Reply"
                fullWidth
                multiline
                rows={4}
                value={replyText}
                onChange={(event) =>
                  setReplyText(event.target.value)
                }
              />
              
              <Button variant="contained" onClick={handleReplySubmit}>
                Save Changes
              </Button>
          </Box>
        </Modal>
    </div>
  )
}

export default ReplyButton
