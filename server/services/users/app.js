require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4001;
const { connect, getDatabase } = require("./config/mongodb");
const router = require("./routes/index");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(router);

// app.get("/users", async (req, res) => {
//   const db = getDatabase();
//   const userCollection = db.collection("users");
//   const list = await userCollection.find().toArray();

//   res.status(200).json({ list });
// });

connect().then(() => {
  app.listen(PORT, (_) => {
    console.log("app is running on port", PORT);
  });
});
