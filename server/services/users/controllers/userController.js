const { comparePassword } = require("../helpers/bcrypt");
const { signPayload } = require("../helpers/jwt");
const User = require("../models/user");

class UserController {
  static async loginHandler(req, res, next) {
    const { username, password } = req.body;
    // console.log(req.body);
    try {
      const findUser = await User.findOne(username);

      const isMatch = comparePassword(password, findUser.password);

      if (!isMatch) {
        throw {
          name: "NOT AUTHORIZED",
          msg: "Invalid email/password",
        };
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
      next();
    }
  }
  static async registerHandler(req, res, next) {
    const { username, email, password, phoneNumber, address } = req.body;
    try {
      const createUser = await User.create({
        username,
        email,
        password,
        role: "admin",
        phoneNumber,
        address,
      });
      res.status(201).json(createUser);
    } catch (err) {
      next();
    }
  }
  static async listUsers(req, res, next) {
    try {
      const listUsers = await User.findAll();
      res.status(200).json({ listUsers });
    } catch (err) {
      next();
    }
  }
}

module.exports = UserController;
