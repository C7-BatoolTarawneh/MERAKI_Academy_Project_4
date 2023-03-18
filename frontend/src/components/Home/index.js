import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import TweetCard from "../TweetCard";
import "./style.css";
import { UserContext } from "../../App";
import LeftNavbar from "../LeftNavbar";
import axios from "axios";
import LikeButton from "../LikeButton";
import CreateNewTweet from "../CreateNewTweet";
import { margin } from "@mui/system";
import RightNavbar from "../RightNavbar";
const Home = () => {
  return (
    <div className="home-container">
      <div className="home-center">
        <h1 className="home-header">Home</h1>
        <CreateNewTweet />
        <TweetCard />
      </div>
      <LeftNavbar  />
      <RightNavbar />
    </div>
  );
};

export default Home;
