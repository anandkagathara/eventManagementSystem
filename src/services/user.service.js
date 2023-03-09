const User = require("../models/user.model");

exports.getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateUser = async (userId, userUpdates) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (userUpdates.firstName) {
      user.firstName = userUpdates.firstName;
    }
    if (userUpdates.lastName) {
      user.lastName = userUpdates.lastName;
    }
    if (userUpdates.dateOfBirth) {
      user.dateOfBirth = userUpdates.dateOfBirth;
    }
    if (userUpdates.gender) {
      user.gender = userUpdates.gender;
    }
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteUser = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateProfileImage = async (userId, imagePath) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  user.profilePhotoUrl = imagePath;
  return user.save();
};
