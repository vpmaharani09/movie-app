const { getDatabase } = require("../config/mongodb");
const { encryptPassword } = require("../helpers/bcrypt");

class User {
  static async findOne(username) {
    const db = getDatabase();
    const userCollection = db.collection("users");
    const findUser = await userCollection.find({ username }).toArray();
    const user = findUser[0];
    return user;
  }
  static async create(payload) {
    const db = getDatabase();
    const userCollection = db.collection("users");
    payload.password = encryptPassword(payload.password);
    const createUser = await userCollection.insertOne(payload);

    return {
      id: createUser.insertedId,
      username: payload.username,
      email: payload.email,
    };
  }
  static async findAll() {
    const db = getDatabase();

    const userCollection = db.collection("users");
    const usersList = await userCollection.find().toArray();

    return usersList;
  }
}

module.exports = User;
