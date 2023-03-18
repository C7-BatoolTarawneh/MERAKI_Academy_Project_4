import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import { Card, Text, Divider, CardBody, CardFooter } from "@chakra-ui/react";
import Button from '@mui/joy/Button';
import Stack from "@mui/material/Stack";
import "./style.css";
import { Avatar, TextField } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhotoOutlined";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticonOutlined";
import CardMedia from "@mui/material/CardMedia";

import Picker from "emoji-picker-react";
import "emoji-picker-react/src/components/emoji/Emoji.css";
import { padding } from "@mui/system";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";

const CreateNewTweet = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const { token } = useContext(UserContext);
  const [url, setUrl] = useState("");
  const fileInputRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiList, setEmojiList] = useState([]);

  const uploadImage = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
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
      console.log(json.url);
      setUrl(json.url); // update the url state here
      handleCreateTweet(json.url);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateTweet = async (url) => {
    console.log(66);
    try {
      const response = await axios.post(
        `http://localhost:5000/tweets/create`,
        {
          description: description,
          image: url,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setDescription("");
      setImage(null);
      setUrl("");
    } catch (error) {}
  };
  const handleEmojiClick = (emoji) => {
    const emojiString = emoji.native;
    setDescription((description) => `${description}${emojiString}`);
  };

  const handleDeleteEmoji = (index) => {
    const newEmojiList = [...emojiList];
    newEmojiList.splice(index, 1);
    setEmojiList(newEmojiList);
    setDescription(newEmojiList.join(""));
  };
  return (
    <form
      className="form-horizontal"
      reply
      onSubmit={(e) => {
        uploadImage(e);
      }}
    >
      <Card
        sx={{
          maxWidth: "78%",
          highet: 100,
          borderRadius: "16px",
          border: "outset",
          borderWidth: 7,
          borderColor: "#6495ED",
          borderSize: 12,
          padding: 10,
        }}
      >
        <CardBody>
          <Stack>
            <TextField
              multiline
              rows={4}
              placeholder="Whats happening?!"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></TextField>

            <Divider variant="inset" marginTop={"10px"} />
            <CardMedia />

            <Text color="blue.600" fontSize="5"></Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <input
            ref={fileInputRef}
            accept="image/*"
            id="tweet-image-upload"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ display: "none" }}
          />
          <InsertPhotoIcon
            color="primary"
            fontSize="large"
            src={url}
            onClick={() => fileInputRef.current.click()}
          ></InsertPhotoIcon>

          <InsertEmoticonIcon
            color="primary"
            fontSize="large"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            style={{ position: "relative" }}
          ></InsertEmoticonIcon>

          {showEmojiPicker && (
            <div style={{ position: "absolute", top: "100%", right: 0 }}>
              <Picker
                onEmojiClick={handleEmojiClick}
                disableAutoFocus={true}
                native={true}
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button
              size="md"
              sx={(theme) => ({
                background: `linear-gradient(-45deg, #6495ED, #9d4edd)`,
                fontWeight: 'lg', // short-hand syntax, same as `theme.fontWeight.lg`
                '&:hover': {
                  background: `linear-gradient(-45deg, ${theme.vars.palette.primary[900]}, ${theme.vars.palette.primary[600]})`,
                },
              })}
              type="submit"
              onClick={handleCreateTweet}
            >
              Tweet
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};

export default CreateNewTweet;
