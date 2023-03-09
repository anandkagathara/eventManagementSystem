const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decodedToken.userId });

    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: "Unauthorized access",
    });
  }
};

module.exports = authMiddleware;
