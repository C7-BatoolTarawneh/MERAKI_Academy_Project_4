import React, { useState, useEffect, createContext, useContext } from 'react'
import { link, useNavigate, useParams } from "react-router-dom";

import "./style.css"
import axios from "axios"
import { UserContext } from "../../App";
const UserPersonalCard = () => {
    const { isLoggedIn, token, user, userId, userName } = useContext(UserContext);
 const[users,setUsers]=useState("")
 const [followers, setFollowers] = useState(0);
const [following, setFollowing] = useState(0);
const {followerId} = useParams()

    const getUserById = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/users/${!followerId ? userId : followerId}`
          );
          console.log("response: ", response.data.user);
          setUsers(response.data.user);
            // setUserId(response.data.userId);
        } catch (err) {
          console.log(err);
        }
      };

      const getFollowers = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/users/${!followerId ? userId : followerId}`
          );
          setFollowers(response.data.user.followers.length);
        } catch (err) {
          console.log(err);
        }
      };
    
      const getFollowing = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/users/${!followerId ? userId : followerId}`
          );
          setFollowing(response.data.user.following.length);
        } catch (err) {
          console.log(err);
        }
      };



      useEffect(() => {
        getUserById()
        getFollowers()
        getFollowing()
      }, [])

      const renderCard = ()=>

      {
        return(
      
     <div className="profilee"  >
        
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={users.coverPicture}
                alt=""
              />
              <img
                className="profileUserImg"
                src={users.profilePicture}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{users.userName}</h4>
                <div className="profileInfoCounts">
    <div>
      <h2>{followers}</h2>
      <p>Followers</p>
    </div>
    <div>
      <h2>{following}</h2>
      <p>Following</p>
    </div>
    </div>

            </div>
          </div>
          <div className="profileRightBottom">
         
            
          </div>
        </div>
      </div>
        )
      }


  return (
 <div>
   {renderCard()}
    </div>  
  )
}

export default UserPersonalCard