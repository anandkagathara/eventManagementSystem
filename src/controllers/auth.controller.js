const authService = require("../services/auth.service");
const authValidator = require("../validators/auth.validator");

exports.signup = async (req, res) => {
  try {
    await authValidator.authValidator(req.body);
    const data = await authService.createUser(req.body);
    res.status(200).json({
      message: "User created successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    await authValidator.authValidator(req.body);
    const token = await authService.loginUser(req.body);

    res.status(200).json({
      status: "success",
      message: "User login successfully",
      data: {
        token,
      },
    });
  } catch (error) {
    const statusCode = error.statusCode || 500; // Internal Server Error
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message });
  }
};
