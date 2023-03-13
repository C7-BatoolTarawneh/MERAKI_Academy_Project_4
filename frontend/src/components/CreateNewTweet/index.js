import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import {
  Card,
  Image,
  Stack,
  Text,
  Divider,
  Button,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import "./style.css";
import { TextField } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

const CreateNewTweet = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const { token } = useContext(UserContext);
  const [url, setUrl] = useState("");

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

  return (
    <form
      reply
      onSubmit={(e) => {
        uploadImage(e);
      }}
    >
      <Card className="main-card" maxWidth={600}>
        <CardBody>
          <Stack mt="6" spacing="3">
            <TextField
              multiline
              rows={4}
              placeholder="Whats happening?!"
              onChange={(e) => setDescription(e.target.value)}
            ></TextField>
            <Divider variant="inset" marginTop={"10px"} />
            <Image src="fth" alt="bg" borderRadius="lg" />

            <Text color="blue.600" fontSize="2xl"></Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <input
            accept="image/*"
            id="tweet-image-upload"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {image && (
            <Image
              src={url}
              alt="uploaded image"
              borderRadius="lg"
              boxSize="200px"
            />
          )}

          <InsertEmoticonIcon
            color="primary"
            fontSize="large"
          ></InsertEmoticonIcon>

          <Button
            className="tweet-button"
            type="submit"
            onClick={handleCreateTweet}
          >
            Tweet
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default CreateNewTweet;
