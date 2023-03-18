import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
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
import { blue } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Modal,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { UserContext } from "../../App";
import LikeButton from "../LikeButton";

import "./style.css";
import ReplyButton from "../ReplyButton";

const TweetCard = () => {
  const [tweets, setTweets] = useState([]);
  const { isLoggedIn, token, user } = useContext(UserContext);
  const [userId, setUserId] = useState("");
  //   const{tweetId} = useParams()
  const [updatedTweet, setUpdatedTweet] = useState({
    description: "",
    image: "",
  });
  const [tweetId, setTweetId] = useState("");
  const [isUpdating, setIsUpdating] = useState("");

  //anchorEl is used to control whether the Menu component is displayed or hidden.
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTweet, setSelectedTweet] = useState(null);
  const [isReplying, setIsReplying] = useState(false);

  //initialize the cloudenary component
  const [imagee, setImagee] = useState("");
  const [url, setUrl] = useState("");

  const uploadImage = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", imagee);
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
      // setUrl(json.url); // update the url state here
      handleEditTweetSubmit(json.url);
      console.log("json: ", json);
    } catch (err) {
      console.log(err);
    }
  };

  //to monitore the modal state is shown or hidden
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (event, tweet) => {
    setSelectedTweet(tweet);
    setAnchorEl(event.currentTarget);
  };

  //open the modal when the EditIcon is clicked

  // if modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
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

  const handleEditTweetSubmit = async (url) => {
    // e.preventDefault();
    try {
      const tweetData = {
        description: updatedTweet.description,
        image: url,
      };

      const response = await axios.put(
        `http://localhost:5000/tweets/update/${tweetId}`,
        tweetData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        const updatedTweets = tweets.map((tweet) => {
          if (tweet._id === tweetId) {
            return {
              ...tweet,
              description: updatedTweet.description,
              image: url || tweet.image,
            };
          }
          return tweet;
        });

        setTweets(updatedTweets);
        setIsUpdating(false);
        setUpdatedTweet({ description: "", image: "" });
        setAnchorEl(null);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTweetClick = (tweet) => {
    setIsUpdating(true);
    setUpdatedTweet({ description: tweet.description, image: tweet.image });
    setIsModalOpen(true);
    setTweetId(tweet._id);
    console.log(tweet._id);
  };

  const handleReplyButtonClick = () => {
    setIsReplying(true);
  };

  useEffect(() => {
    getAllTweets();
  }, []);

  const renderTweets = () => {
    return tweets
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((tweet) => (
        <div className="card-pos" key={tweet._id}>
          <Card sx={{ bgcolor: "#00000" }}>
            <CardHeader
              avatar={
                <Avatar
                  src={tweet.writer.profilePicture}
                  sx={{ bgcolor: blue[500] }}
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
              title={`@${tweet.writer.userName} `}
              subheader={
                <React.Fragment>
                  <div>
                    {"Created at: " +
                      new Date(tweet.createdAt).toLocaleString()}
                  </div>
                  <div>
                    {"Updated at: " +
                      new Date(tweet.updatedAt).toLocaleString()}
                  </div>
                </React.Fragment>
              }
            />
            {tweet.image && (
              <CardMedia
                sx={{ maxWidth: 300, mx: "auto", borderRadius: "10px" }}
                component="img"
                // width="5%"
                sizes="mini"
                padding="30"
                // height="1%"
                image={tweet.image}
                src={url}
                alt="Tweet image"
              />
            )}
            <CardContent>
              <Typography
                variant="body2"
                color="text.primary"
                fontFamily="Arial"
                fontSize="20px"
              >
                {tweet.description}
              </Typography>
            </CardContent>
            <CardActions
              disableSpacing
              sx={{ bgcolor: "#ffffff", border: "outset", position: "sticky" }}
            >
              <IconButton
                aria-label="add to favorites"
                disableRipple
                sx={{ disableTouchRipple: false }}
              >
                <LikeButton tweet={tweet} sx={{ position: "sticky" }} />
              </IconButton>

              <IconButton aria-label="reply" disableRipple>
                <ReplyButton
                  tweetId={tweet._id}
                  handleReplyButtonClick={handleReplyButtonClick}
                />
              </IconButton>
            </CardActions>
            {isReplying && (
              <ReplyButton tweetId={tweet._id} setIsReplying={setIsReplying} />
            )}
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
                <MenuItem>
                  <ListItemIcon>
                    <DeleteIcon
                      fontSize="small"
                      onClick={() => handleDeleteTweet(tweet._id)}
                    />
                  </ListItemIcon>
                  <Typography variant="inherit" noWrap>
                    Delete Tweet
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <EditIcon
                      fontSize="small"
                      onClick={() => handleEditTweetClick(tweet)}
                    />
                  </ListItemIcon>
                  <Typography variant="inherit" noWrap>
                    Update Tweet
                  </Typography>
                </MenuItem>
              </div>
            )}
          </Menu>
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
              <form
                onSubmit={(e) => {
                  uploadImage(e);
                }}
              >
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={updatedTweet.description}
                  onChange={(event) =>
                    setUpdatedTweet({
                      ...updatedTweet,
                      description: event.target.value,
                    })
                  }
                />
                <input
                  accept="image/*"
                  id="tweet-image-upload"
                  type="file"
                  onChange={(event) => setImagee(event.target.files[0])}
                />

                <Button
                  variant="contained"
                  type="submit"
                  style={{ backgroundColor: "#8e44ad", color: "#fff" }}
                >
                  Save Changes
                </Button>
              </form>
            </Box>
          </Modal>
        </div>
      ));
  };
  return <div className="tweets-on-render">{renderTweets()}</div>;
};

export default TweetCard;
