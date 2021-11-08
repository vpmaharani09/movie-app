const { comparePassword } = require("../helpers/bcrypt");
const { signPayload } = require("../helpers/jwt");
const User = require("../models/user");

class UserController {
  static async loginHandler(req, res) {
    const { username, password } = req.body;
    try {
      const findUser = await User.findOne(username);

      const isMatch = comparePassword(password, findUser.password);

      if (!isMatch) {
        throw new Error("Invalid email/password");
      }

      const access_token = signPayload({
        id: findUser._id,
        username: findUser.username,
        email: findUser.email,
      });

      res.status(200).json({
        access_token,
      });
    } catch (err) {
      // console.log(err);
      res.status(500).json({
        code: 500,
        msg: "Internal Server Error",
      });
    }
  }
  static async registerHandler(req, res) {
    const { username, email, password, role, phoneNumber, address } = req.body;
    try {
      const createUser = await User.create({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });
      res.status(201).json(createUser);
    } catch (err) {
      res.status(500).json({
        code: 500,
        msg: "Internal Server Error",
      });
    }
  }
  static async listUsers(req, res) {
    try {
      const listUsers = await User.findAll();
      res.status(200).json({ listUsers });
    } catch (err) {
      res.status(500).json({
        code: 500,
        msg: "Internal Server Error",
      });
    }
  }
}

module.exports = UserController;
