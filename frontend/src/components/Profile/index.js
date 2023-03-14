import React, { useState, useEffect, createContext, useContext } from "react";
import { link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import LeftNavbar from "../LeftNavbar";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
const Profile = () => {
  const { isLoggedIn, token, user } = useContext(UserContext);
  const [tweets, setTweets] = useState([]);
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  const getTweetsByWriter = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tweets/search_1?writer=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response.data: ", response.data);
      setTweets(response.data.tweets);
    //   setUserId(response.data.userId);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
    getTweetsByWriter()
  },[])

  return (
    <div>
         <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
     </div>
  );
};

export default Profile;
