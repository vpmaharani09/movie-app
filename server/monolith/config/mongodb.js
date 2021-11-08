const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const dbName = "movies-app";

let database = null;

async function connect() {
  await client.connect();

  const db = client.db(dbName);

  database = db;
}

function getDatabase() {
  return database;
}

module.exports = { connect, getDatabase };
