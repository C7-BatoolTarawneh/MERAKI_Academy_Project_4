import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { UserContext } from "../../App";

import "./style.css";

const TweetCard = () => {

  const [tweets, setTweets] = useState([]);
  const { isLoggedIn, token } = useContext(UserContext);
  const [userId, setUserId] = useState("");

  const { tweetId } = useParams();

  const getAllTweets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tweets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response.data: ", response.data);
      setTweets(response.data.tweets);
      setUserId(response.data.userId);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteTweet = async (tweetId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/tweets/delete/${tweetId}`)
       
        if (response.data.success){
          const deletedItem =tweets.filter((el)=>{
          
            return el._id !== tweetId
          })
          console.log(deletedItem)
          setTweets(deletedItem)}
      
      
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllTweets();
  }, []);

  const renderTweets = () => {
    return tweets.map((tweet) => (
      <div className="card-pos" key={tweet._id}>
        <Card sx={{ maxWidth: 600 }}>
          <CardHeader
            avatar={
              <Avatar
                src={tweet.writer.profilePicture}
                sx={{ bgcolor: red[500] }}
              >
                {tweet.writer.userName ? tweet.writer.userName.charAt(0) : ""}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={`${tweet.writer.userName} `}
            subheader={new Date(tweet.createdAt).toLocaleString()}
          />
          {tweet.image && (
            <CardMedia
              component="img"
              width="auto"
              height="auto"
              image={tweet.image}
              alt="Tweet image"
            />
          )}
          <CardContent>
            <Typography variant="body2" color="text.primary">
              {tweet.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    ));
  };

  return <div>{renderTweets()}</div>;
};

export default TweetCard;
