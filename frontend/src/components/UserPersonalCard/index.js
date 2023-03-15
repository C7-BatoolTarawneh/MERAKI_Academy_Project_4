import React, { useState, useEffect, createContext, useContext } from 'react'
import "./style.css"
import axios from "axios"
import { UserContext } from "../../App";
const UserPersonalCard = () => {
    const { isLoggedIn, token, user, userId, userName } = useContext(UserContext);
 const[users,setUsers]=useState("")

    const getUserById = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/users/${userId}`
          );
          console.log("response: ", response.data.user);
          setUsers(response.data.user);
            // setUserId(response.data.userId);
        } catch (err) {
          console.log(err);
        }
      };

      useEffect(() => {
        getUserById()
      }, [])

      const renderCard = ()=>

      {
        return(
      
     <div className="profile"  >
        
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