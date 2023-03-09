const userService = require("../services/user.service");
const userValidator = require("../validators/user.validator");

exports.getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json(users);
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
        const headerId = req.user._id.toString();
      await userValidator.updateUserValidator(req.body);
      const user = await userService.updateUser(headerId, req.body);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const headerId = req.user._id.toString();
    if (headerId == req.params.id) {
    const user = await userService.deleteUser(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
}else{
    return res.status(404).json({ message: "You can delete only your data" });
}
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePhoto = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    console.log(userId);
    const imagePath = req.file.path;
    console.log(imagePath);
    const user = await userService.updateProfileImage(userId, imagePath);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
