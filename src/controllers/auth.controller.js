const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");

const signup = async (req, res) => {
  try {
    const response = await userService.createUser({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      success: true,
      message: "Successfully registered a new user",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in controller layer",
      data: {},
      err: error,
    });
  }
};

const signin = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.body.email);
    const isValidPassword = await user.isValidPassword(req.body.password);

    if (!isValidPassword) {
      // throw error if the password is invalid
      throw { err: "Invalid password for the given email", code: 401 };
    }

    const token = jwt.sign({ id: user.id, email: user.email }, AUTH_KEY, {
      expiresIn: "5h",
    });
    return res.status(201).json({
      success: true,
      message: "Successfully logged in",
      data: token,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in controller layer",
      data: {},
      err: error,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const user = userService.getUserById(req.body);
    const isOldPasswordCorrect = await user.isValidPassword(
      req.body.oldPassword
    );

    if (!isOldPasswordCorrect) {
      // Throw error if the old password is incorrect
      throw {
        err: "Invalid old password, please write the correct old password",
        code: 403,
      };
    }

    user.password = req.body.newPassword;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Successfully update the password for the given user",
      data: user,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in controller layer",
      data: {},
      err: error,
    });
  }
};

module.exports = {
  signup,
  signin,
  resetPassword,
};
