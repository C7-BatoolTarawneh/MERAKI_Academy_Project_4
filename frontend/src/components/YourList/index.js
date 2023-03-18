import React, { useState, useEffect, createContext, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import axios from "axios";
import RightNavbar from "../RightNavbar";
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import LeftNavbar from "../LeftNavbar";
import {
  Avatar,
  Flex,
  Text,
  VStack,
  Spacer,
  Box,

} from "@chakra-ui/react";
import Button from  '@mui/material/Button'
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';

import "./style.css"
const YourList = () => {
  const { isLoggedIn, token, user, userId, userName } = useContext(
    UserContext
  );
  const [users, setUsers] = useState({ followers: [], following: [] });

  const getUserById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      console.log("response: ", response.data.user);
      setUsers(response.data.user);
      // setUserId(response.data.userId);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnfollow = async (followingId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/users/unfollow/${followingId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers((prevUsers) => {
        const newFollowing = prevUsers.following.filter(
          (following) => following._id !== followingId
        );
        return { ...prevUsers, following: newFollowing };
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleFollow = async (followingId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/users/follow/${followingId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers((prevUsers) => {
        const newFollowing = [...prevUsers.following, response.data.following];
        return { ...prevUsers, following: newFollowing };
      });
    } catch (err) {
      console.log(err);
    }
  };
  const isFollowing = (userId) => {
    return users.following.some((following) => following._id === userId);
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <div className=" list-container">
    
      <div className="left-navbar">
      <LeftNavbar />
      {/* <RightNavbar/> */}
</div>
<div className="list-contents">
<h1>Your Network </h1>
<br/>
{/* contain followers and followings with ther lists */}
      <Box marginLeft={"6vw"} marginTop={"5vh"}>
        <Flex>
          {/* followerbox */}
          <Box>
            <Text mb="10" fontWeight="bold" fontSize="25" fontFamily="Arial" color="#6495ED">
              Followers
            </Text>
            <Box  >
              {users.followers.length > 0 ? (
                users.followers.map((follower) => (
                  <Flex key={follower._id} alignItems="center" my={2}>
                     <Link to={`/profile/${follower._id}`}> 
                    <Avatar
                      src={follower.profilePicture}
                      boxSize="5vw"
                      borderRadius= '50%' 
                      sx={{ width: "5vw", height: "5vw", }}
                      mr={"1vw"}
                    />
                     </Link>
                    <Text mr={"1vw"}>{follower.userName}</Text>
                    {!isFollowing(follower._id) && (
                      <Button
                      variant="contained"
                      endIcon={<AddCircleSharpIcon />}
                        colorScheme="teal"
                        size="xs"
                        ml={2}
                        onClick={() => handleFollow(follower._id)}
                      >
                        Follow
                        </Button>
                )}
                  </Flex>
                ))
              ) : (
                <Text sx={{ color: 'text.secondary' }}>No one is following you</Text>
              )}
            </Box>
          </Box>
          <Box mx="auto">
            <Text mb="10" fontWeight="bold" fontSize="25" fontFamily="Arial" color="#6495ED">
              Following
            </Text>
            <Box>
              {users.following.length > 0 ? (
                users.following.map((theFollowing) => (
                  <Flex key={theFollowing._id} alignItems="center" my={2}>
                    <Link to={`/profile/${theFollowing._id}`}>
                    <Avatar
                      src={theFollowing.profilePicture}
                      boxSize= "5vw"
                      borderRadius= "50%"
                      sx={{ width: "5vw", height: "5vw", }}
                      mr={"1vw"}
                    />
                    </Link>
                    <Text mr={"1vw"}>{theFollowing.userName}</Text>
                    <Button
                      variant="contained"
                      endIcon={<RemoveCircleSharpIcon />}
                        colorScheme="teal"
                        size="xs"
                        ml={2}
                      onClick={() => handleUnfollow(theFollowing._id)}
                    >
                      Unfollow
                    </Button>
                  </Flex>
                ))
              ) : (
                <Text>You are not following anyone</Text>
              )}
            </Box>
          </Box>
        </Flex>
      </Box>
      </div>
    </div>
  );
};

export default YourList;
