import React,{useState,useEffect,useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useParams} from "react-router-dom"
import TweetCard from '../TweetCard'

import {UserContext} from '../../App'
import LeftNavbar from "../LeftNavbar"
import axios from 'axios'
import LikeButton from '../LikeButton'

const Home = () => {
 

  return (
    
  
    <div>Home
      <LeftNavbar/>
      <TweetCard/>
      
</div>

  )
}

export default Home