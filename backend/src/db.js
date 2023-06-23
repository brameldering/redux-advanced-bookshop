import { MongoClient } from "mongodb";

let db;

async function connectToDb(cb) {
  // const dbURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@bram-test-mongodb.koftlqn.mongodb.net/?retryWrites=true&w=majority`;
  const dbURI = `mongodb://127.0.0.1:27017`;
  const client = new MongoClient(dbURI);
  await client.connect();
  db = client.db("bram-bookstore");
  //   console.log("db in connectToDb");
  //   console.log(db);
  cb();
}

export { db, connectToDb };
