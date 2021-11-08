const axios = require("axios");

const serverApp = axios.create({
  // baseURL: "https://services-movies.herokuapp.com",
  baseURL: "http://localhost:4002",
});

const serverUser = axios.create({
  // baseURL: "https://microservices-users.herokuapp.com",
  baseURL: "http://localhost:4001",
});

module.exports = { serverApp, serverUser };
