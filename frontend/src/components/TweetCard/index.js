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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { UserContext } from "../../App";

import "./style.css";

const TweetCard = () => {
  const [tweets, setTweets] = useState([]);
  const { isLoggedIn, token ,user} = useContext(UserContext);
  const [userId, setUserId] = useState("");
  //anchorEl is used to control whether the Menu component is displayed or hidden.
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTweet, setSelectedTweet] = useState(null);


  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
//   const handleMenuClick = (event, tweet) => {
//     setSelectedTweet(tweet);
//     setAnchorEl(event.currentTarget);
//   };

  const handleMenuClick = (event, tweet) => {
    setSelectedTweet(tweet);
    setAnchorEl(event.currentTarget);
  };

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


  /*const handleDeleteTweet = async (tweetId) => {
    try {
        const response = await axios.delete(
          `http://localhost:5000/tweets/delete/${tweetId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      if (response.data.success) {
        const deletedItem = tweets.filter((t) => {
          return t._id !== tweetId;
          
        });
        console.log(deletedItem);
        setTweets(deletedItem);
        setSelectedTweet(null);
        setAnchorEl(null);
      }

    } catch (error) {
      console.log(error);
    }
  };*/
  
  const handleDeleteTweet = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/tweets/delete/${selectedTweet._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setTweets((prevTweets) => {
          return prevTweets.filter((tweet) => tweet._id !== selectedTweet._id);
        });
        setSelectedTweet(null);
        setAnchorEl(null);
      }
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
            
              isLoggedIn &&
              tweet.writer._id === userId && (
                <IconButton
                  aria-label="settings"
                  onClick={(event) => handleMenuClick(event, tweet)}
                >
                  <MoreVertIcon />
                </IconButton>
              )
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
       
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl) && selectedTweet?._id === tweet._id}
        onClose={handleMenuClose}
          
        >
          {tweet?.writer._id === userId && (
            <div>
              <MenuItem >
              
                <ListItemIcon  >
                  <DeleteIcon  fontSize="small" onClick={()=>handleDeleteTweet(tweet._id)} />
                </ListItemIcon>
                <Typography variant="inherit" noWrap>
                  Delete Tweet
                </Typography>
              </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit" noWrap>
                    Update Tweet
                  </Typography>
                </MenuItem>
             
            </div>
          )}
        </Menu>
      </div>
      //   </div>
    ));
  };

  return <div>{renderTweets()}</div>;
};

export default TweetCard;
