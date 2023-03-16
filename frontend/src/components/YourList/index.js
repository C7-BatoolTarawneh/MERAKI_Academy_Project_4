import React, { useState, useEffect, createContext, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import axios from "axios";
import LeftNavbar from "../LeftNavbar";
import {
  Avatar,
  Flex,
  Text,
  VStack,
  Spacer,
  Box,
  Button,
} from "@chakra-ui/react";

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
    <div>
      <LeftNavbar />
      <Box mx="300">
        <Flex>
          <Box mx="auto">
            <Text fontWeight="bold" fontSize="lg">
              Followers
            </Text>
            <Box>
              {users.followers.length > 0 ? (
                users.followers.map((follower) => (
                  <Flex key={follower._id} alignItems="center" my={2}>
                     <Link to={`/profile/${follower._id}`}> 
                    <Avatar
                      src={follower.profilePicture}
                      boxSize="40px"
                      mr={2}
                    />
                     </Link>
                    <Text>{follower.userName}</Text>
                    {!isFollowing(follower._id) && (
                      <Button
                        variant="solid"
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
                <Text>No one is following you</Text>
              )}
            </Box>
          </Box>
          <Box mx="auto">
            <Text fontWeight="bold" fontSize="lg">
              Following
            </Text>
            <Box>
              {users.following.length > 0 ? (
                users.following.map((theFollowing) => (
                  <Flex key={theFollowing._id} alignItems="center" my={2}>
                    <Link to={`/profile/${theFollowing._id}`}>
                    <Avatar
                      src={theFollowing.profilePicture}
                      boxSize="40px"
                      mr={2}
                    />
                    </Link>
                    <Text>{theFollowing.userName}</Text>
                    <Button
                      variant="solid"
                      colorScheme="red"
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
  );
};

export default YourList;
