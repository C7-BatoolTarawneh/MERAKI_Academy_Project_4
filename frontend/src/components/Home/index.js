import React,{useState,useEffect,useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useParams} from "react-router-dom"
import TweetCard from '../TweetCard'
import "./style.css";
import {UserContext} from '../../App'
import LeftNavbar from "../LeftNavbar"
import axios from 'axios'
import LikeButton from '../LikeButton'
import CreateNewTweet from '../CreateNewTweet'

const Home = () => {
 

  return (
    
  
    <div>
      <CreateNewTweet/>
      <LeftNavbar/>
      <TweetCard/>
      
</div>

  )
}

export default Home