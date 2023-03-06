const express = require("express");
const {
  register,
  login,
  getUserById,
  getUserByUserName,
  updateUserEmail,
  updateUserPassword,
  updateUserProfilePicture,
  updateUserCoverPicture,
  deleteUser,
  followUser,
  unfollowUser,
} = require("../controllers/usersController");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/:id", getUserById);
usersRouter.get("/", getUserByUserName); //http://localhost:5000/users?userName=Banan
usersRouter.put(
  "/email",
  authentication,
  authorization("UPDATE_EMAIL"),
  updateUserEmail
);
usersRouter.put(
  "/password",
  authentication,
  authorization("UPDATE_PASSWORD"),
  updateUserPassword
);
usersRouter.put(
  "/profilePicture",
  authentication,
  authorization("UPDATE_PROFILE_PICTURE"),
  updateUserProfilePicture
);
usersRouter.put(
  "/coverPicture",
  authentication,
  authorization("UPDATE_COVER_PICTURE"),
  updateUserCoverPicture
);
usersRouter.delete("/:id", authentication, authorization("DELETE"), deleteUser);

usersRouter.put(
  "/follow/:id",
  authentication,
  authorization("FOLLOW"),
  followUser
);
usersRouter.put(
  "/unfollow/:id/",
  authentication,
  authorization("UNFOLLOW"),
  unfollowUser
);

module.exports = usersRouter;
