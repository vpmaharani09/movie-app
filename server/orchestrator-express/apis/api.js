const axios = require("axios");

const server = axios.create({
  baseURL: "http://localhost:4002",
});

module.exports = server;
