const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://movies-app:Maharani234@cluster0.dhqih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
