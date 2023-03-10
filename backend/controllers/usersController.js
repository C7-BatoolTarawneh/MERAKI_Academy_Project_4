const userModel = require("../models/users");
const RoleModel = require("../models/roles");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//register
const register = async (req, res) => {
  const { userName,profilePicture, age, email, password, role } = req.body;

  try {
    // Check if role with given ID exists
    const existingRole = await RoleModel.findById(role);
    if (!existingRole) {
      return res.status(404).json({
        success: false,
        message: `Role with ID ${role} not found`,
      });
    }
    if (age < 18) {
      return res.status(400).json({
        success: false,
        message: `User must be at least 18 years old to register`,
      });
    }

    const user = new userModel({
      userName,
      age,
      email,
      password,
      profilePicture,
      role: role,
      followers: [],
      followings: [],
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
    
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  }
};

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
          expiresIn: "24h",
        };
        const token = jwt.sign(payload, process.env.SECRET, options);
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          user: result,
          token: token,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    })
    .catch((error) => {
      throw new Error(error.message);
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

const followUser = async (req, res) => {
  const followerId = req.token.userId;
  const followingId = req.params.id;

  try {
    const follower = await userModel.findById(followerId);
    const following = await userModel.findById(followingId);

    if (!follower || !following) {
      return res.status(404).json({
        success: false,
        message: `User not found`,
      });
    }

    if (
      follower.followings.includes(followingId) ||
      following.followers.includes(followerId)
    ) {
      return res.status(400).json({
        success: false,
        message: `You are already following this user`,
      });
    }

    await Promise.all([
      userModel.updateOne(
        { _id: followerId },
        { $addToSet: { followings: followingId } }
      ),
      userModel.updateOne(
        { _id: followingId },
        { $addToSet: { followers: followerId } }
      ),
    ]);

    const updatedFollower = await userModel
      .findById(followerId)
      .populate("role", "-_id -__v");

    const updatedFollowing = await userModel
      .findById(followingId)
      .populate("role", "-_id -__v");

    res.status(200).json({
      success: true,
      message: `You are now following user with ID ${followingId}`,
      follower: updatedFollower,
      following: updatedFollowing,
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
  const followerId = req.token.userId;
  const followingId = req.params.id;

  try {
    const follower = await userModel.findById(followerId);
    const following = await userModel.findById(followingId);

    if (!follower || !following) {
      return res.status(404).json({
        success: false,
        message: `User not found`,
      });
    }

    if (
      !follower.followings.includes(followingId) ||
      !following.followers.includes(followerId)
    ) {
      return res.status(400).json({
        success: false,
        message: `You are not following this user`,
      });
    }

    await Promise.all([
      userModel.updateOne(
        { _id: followerId },
        { $pull: { followings: followingId } }
      ),
      userModel.updateOne(
        { _id: followingId },
        { $pull: { followers: followerId } }
      ),
    ]);

    const updatedFollower = await userModel
      .findById(followerId)
      .populate("role", "-_id -__v");

    const updatedFollowing = await userModel
      .findById(followingId)
      .populate("role", "-_id -__v");

    res.status(200).json({
      success: true,
      message: `You have unfollowed user with ID ${followingId}`,
      follower: updatedFollower,
      following: updatedFollowing,
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
  unfollowUser,
};
