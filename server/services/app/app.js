require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4002;
const cors = require("cors");
const router = require("./routes/index");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(PORT, (_) => {
  console.log("server is running on port", PORT);
});
