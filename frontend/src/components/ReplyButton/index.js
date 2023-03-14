import React, { useState, useContext } from "react";
import {  Comment } from "semantic-ui-react";
import {  Button, IconButton } from "@mui/material";

import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import axios from "axios";
import { UserContext } from "../../App";
import CommentBox from "../CommentBox";
import { red } from "@mui/material/colors";
import CardMedia from "@mui/material/CardMedia";
import "./style.css";

const ReplyButton = ({ tweetId }) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [replies, setReplies] = useState([]);
  const { isLoggedIn, token } = useContext(UserContext);

  const handleCreateCommentClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/replies/${tweetId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("REPLIES response.data: ", response.data.replies);
      setReplies(response.data.replies);
      setIsCommenting(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelCommentClick = () => {
    setIsCommenting(false);
  };

  return (
    <div>
      {!isCommenting && (
        <IconButton disableRipple>
        <ChatBubbleOutlineRoundedIcon  onClick={handleCreateCommentClick} />
        </IconButton>
      )}
      {isCommenting && (
        <>
          <Comment.Group style={{ boxShadow: "none", marginRight: "20px" }}>
            {replies.map((reply) => (
              <Comment key={reply._id} style={{ borderTop: "1px solid #ddd" }}>
                <Comment.Content>
                  <Comment.Author as="a">
                    <h6 style={{ display: "inline-block", marginRight: "3px" }}>
                      {"@"+reply.replyCreator.userName}
                    </h6>
                  </Comment.Author>
                  <Comment.Text ><p>{reply.caption}</p></Comment.Text>
                  {reply.replyImage && (
                    <CardMedia
                    sx={{ maxWidth: 100, mx: 'auto' ,mt:2 }}
                      component="img"
                      width="0.05%"
                      height="0.05%"
                      size="mini"
                      image={reply.replyImage}
                      alt="Tweet image"
                    />
                  )}
                </Comment.Content>
              </Comment>
            ))}
          </Comment.Group>
          <div style={{ marginTop: "20px" }}>
            {isLoggedIn && (
              <CommentBox
                tweetId={tweetId}
                handleCommentSubmit={(newReply) =>
                  setReplies([...replies, newReply])
                }
              />
            )}
            <Button
            
              style={{ marginTop: "10px" }}
              variant="contained"
              color="error"
              onClick={handleCancelCommentClick}
            >
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReplyButton;
