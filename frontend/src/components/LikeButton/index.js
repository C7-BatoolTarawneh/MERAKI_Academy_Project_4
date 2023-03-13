import React, { useState,useContext,useEffect } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { UserContext } from "../../App";




  const LikeButton = ({ tweet }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(tweet.likes.length);
    const { token, user } = useContext(UserContext);
  
    useEffect(() => {
      const likedTweets = JSON.parse(localStorage.getItem('likedTweets')) || [];
      setIsLiked(likedTweets.includes(tweet._id));
    }, [tweet._id]);
  
    const handleLikeClick = async () => {
      try {
        if (isLiked) {
          const response = await axios.put(
            `http://localhost:5000/tweets/unlike/${tweet._id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setLikeCount((prevCount) => prevCount - 1);
        } else {
          const response = await axios.put(
            `http://localhost:5000/tweets/like/${tweet._id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setLikeCount((prevCount) => prevCount + 1);
        }
        setIsLiked(!isLiked);
  
        const likedTweets = JSON.parse(localStorage.getItem('likedTweets')) || [];
  
        if (isLiked) {
          localStorage.setItem(
            'likedTweets',
            JSON.stringify(likedTweets.filter((id) => id !== tweet._id))
          );
        } else {
          localStorage.setItem('likedTweets', JSON.stringify([...likedTweets, tweet._id]));
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <>
        <IconButton disableRipple
          aria-label="add to favorites"
          onClick={handleLikeClick}
          color={isLiked ? 'secondary' : 'default'}
        >
          <FavoriteIcon />
        </IconButton>
        <span>{likeCount}</span>
      </>
    );
  };
  
  export default LikeButton;