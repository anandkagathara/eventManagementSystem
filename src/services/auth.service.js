const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.createUser = async (userData) => {
  const { email, password } = userData;

  const checkUser = await User.findOne({ email });
  if (checkUser) {
    const error = new Error("User already exists with this email please try with different Email");
    error.statusCode = 409;
    throw error;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  return user.toJSON();
};
exports.loginUser = async (userData) => {
  const { email, password } = userData;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect password");
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  return token;
};
