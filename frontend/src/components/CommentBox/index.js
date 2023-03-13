import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";




const CommentBox = ({ tweetId, handleCommentSubmit }) => {
  const [comment, setComment] = useState("");
  const [replyImage, setReplyImage] = useState(null);
  const [url, setUrl] = useState("");
  const [replyText, setReplyText] = useState("");

  const uploadImage = async (e) => {
        e.preventDefault();

    const data = new FormData();
    data.append("file", replyImage);
    data.append("upload_preset", "a1dhlskc");
    data.append("cloud_name", "dnpshl3op");

    try {
      const resp = await fetch(
        "https://api.cloudinary.com/v1_1/dnpshl3op/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const json = await resp.json();
      console.log(json.url)
      setUrl(json.url); // update the url state here
handleSubmit(json.url)
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (url) => {
    // e.preventDefault();
    try {

      const response = await axios.post(
        `http://localhost:5000/replies/createReply/${tweetId}`,
        {
          caption: replyText,
          replyImage: url,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data)
      handleCommentSubmit(response.data.reply);
      setComment("");
      setReplyImage(null);
      setUrl("");
      setReplyText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form reply onSubmit={(e)=>{
        uploadImage(e)
        }}>
      <TextField
        label="Reply"
        fullWidth
        multiline
        rows={4}
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
      />
      <input
        accept="image/*"
        id="tweet-image-upload"
        type="file"
        onChange={(e) => setReplyImage(e.target.files[0])}
      />
      <br />
      <Button
        style={{ marginTop: "10px" }}
        variant="contained"
        type="submit"
        disabled={!replyText && !replyImage}
      >
        Add Reply
      </Button>
    </form>
  );
};

export default CommentBox;
