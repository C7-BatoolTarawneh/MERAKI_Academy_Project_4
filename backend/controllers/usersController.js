const userModel = require("../models/users");
const RoleModel = require("../models/roles");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//register
const register = async (req, res) => {
  const { userName, age, email, password, role } = req.body;

  try {
    // Check if role with given ID exists
    const existingRole = await RoleModel.findById(role);
    if (!existingRole) {
      return res.status(404).json({
        success: false,
        message: `Role with ID ${role} not found`,
      });
    }

    const user = new userModel({
      userName,
      age,
      email,
      password,
      role: role,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: `Account Created Successfully`,
      user: user,
    });
  } catch (err) {
    if (err.keyPattern) {
      return res.status(409).json({
        success: false,
        message: `The email already exists`,
      });
    }
    if (age < 18) {
      return res.status(400).json({
        success: false,
        message: `User must be at least 18 years old to register`,
      });
    }
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  }
};

module.exports = { register };

// This function checks user login credentials
const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  userModel
    .findOne({ email })
    .populate("role", "-_id -__v")
    .then(async (result) => {
      if (!result) {
        return res.status(403).json({
          success: false,
          message: `The email doesn't exist or The password you’ve entered is incorrect`,
        });
      }
      try {
        const valid = await bcrypt.compare(password, result.password);
        if (!valid) {
          return res.status(403).json({
            success: false,
            message: `The email doesn't exist or The password you’ve entered is incorrect`,
          });
        }
        const payload = {
          userId: result._id,
          user: result.userName,
          role: result.role,
        };

        const options = {
          expiresIn: "60m",
        };
        const token = jwt.sign(payload, process.env.SECRET, options);
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

//get user by id (to be used in Feeds)
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: `User with ${userId} found`,
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  }
};

//get all users by username (used in search)
const getUserByUserName = async (req, res) => {
  try {
    const { userName } = req.query;
    const user = await userModel.findOne({ userName: userName });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with User Name (${userName}) is not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: `User with User Name (${userName}) found`,
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  }
};

const updateUserEmail = async (req, res) => {
  // Get the user ID from the JWT token

  const userId = req.token.userId;
  const newEmail = req.body.email.toLowerCase();
console.log("123");
  try {
    // Find the user by ID and update their email with the new value
    const user = await userModel.findByIdAndUpdate(
      userId,
      { email: newEmail },
      // Return the updated user object
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: `User email updated successfully`,
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err,
    });
  }
};

const updateUserPassword = async (req, res) => {
  const userId = req.token.userId;
  const newPassword = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await userModel.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: `User password updated successfully`,
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  }
};
const updateUserProfilePicture = async (req, res) => {
    const userId = req.token.userId;
    const newProfilePicture = req.body.profilePicture;
  
    try {
      const user = await userModel.findByIdAndUpdate(
        userId,
        { profilePicture: newProfilePicture },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({
          success: false,
          message: `User not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `User profile picture updated successfully`,
        user: user,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    }
  };
  
  const updateUserCoverPicture = async (req, res) => {
    const userId = req.token.userId;
    const newCoverPicture = req.body.coverPicture;
  
    try {
      const user = await userModel.findByIdAndUpdate(
        userId,
        { coverPicture: newCoverPicture },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({
          success: false,
          message: `User not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `User cover picture updated successfully`,
        user: user,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    }
  };
  
  const deleteUser = async (req, res) => {
    // Get the ID of the user to delete from the JWT token
    const userId = req.token.userId;
  
    try {
      // Find the user to delete by their ID and remove them from the database
      const deletedUser = await userModel.findByIdAndRemove(userId);
      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: `User not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `User account and all of its information have been deleted`,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    }
  };
  
  
  
  // This function adds a user to the followers list of another user
  const followUser = async (req, res) => {
    // Get the ID of the user who is being followed from the request parameters
    const followedUserId = req.params.id;
    // Get the ID of the user who is following from the JWT token
    const followerUserId = req.token.userId;
  
    try {
      // Find the user who is being followed by their ID
      const followedUser = await userModel.findById(followedUserId);
      if (!followedUser) {
        return res.status(404).json({
          success: false,
          message: `User not found`,
        });
      }
      // Add the follower's ID to the followers list of the followed user
      followedUser.followers.push(followerUserId);
      // Save the updated user object
      await followedUser.save();
      res.status(200).json({
        success: true,
        message: `User ${followerUserId} is now following user ${followedUserId}`,
        user: followedUser,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    }
  };
  
  // This function removes a user from the followers list of another user
  const unfollowUser = async (req, res) => {
    // Get the ID of the user who is being unfollowed from the request parameters
    const unfollowedUserId = req.params.id;
    // Get the ID of the user who is unfollowing from the JWT token
    const unfollowerUserId = req.token.userId;
  
    try {
      // Find the user who is being unfollowed by their ID
      const unfollowedUser = await userModel.findById(unfollowedUserId);
      if (!unfollowedUser) {
        return res.status(404).json({
          success: false,
          message: `User not found`,
        });
      }
      // Remove the unfollower's ID from the followers list of the unfollowed user
      unfollowedUser.followers = unfollowedUser.followers.filter(
        (id) => id != unfollowerUserId
      );
      // Save the updated user object
      await unfollowedUser.save();
      res.status(200).json({
        success: true,
        message: `User ${unfollowerUserId} has unfollowed user ${unfollowedUserId}`,
        user: unfollowedUser,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    }
  };
  
  

module.exports = {
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
  unfollowUser
};
