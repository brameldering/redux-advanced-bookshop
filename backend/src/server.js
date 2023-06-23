import express from "express";
import cors from "cors";
import { db, connectToDb } from "./db.js";

const app = express();
app.use(express.json());
app.use(cors());

// api to get all books
app.get("/api/books", async (req, res) => {
  console.log("app.get(/api/books)");
  // console.log(db);
  const books = await db.collection("books").find({}).toArray();
  res.json(books);
});

// api to get a single book based on id
app.get("/api/books/:id", async (req, res) => {
  console.group();
  console.log("app.get(/api/books/:id)");
  const id = req.params.id;
  console.log("id: " + id);
  const book = await db.collection("books").findOne({ id: id });
  res.json(book);
  console.groupEnd();
});

// api to add a new book
app.post("/api/books", async (req, res) => {
  console.group();
  console.log("app.post(/api/books)");
  let result = {
    acknowledged: false,
  };
  const book = req.body;
  // TO DO: test the following
  if (!book) {
    res.status(400).json({ error: "Invalid book" });
    return;
  }
  try {
    result = await db.collection("books").insertOne(book);
    console.log("in try");
    console.log(result);
  } catch (error) {
    console.log("Error in app.post(/api/books)");
    console.error(error);
  } finally {
    console.log("in finally");
    console.log(result);
    res.json(result);
    console.groupEnd();
  }
});

// allow for environment variable PORT with a default of 8000 (for dev)
const PORT = process.env.PORT || 8000;

connectToDb(() => {
  console.group();
  console.log("Succesfully connected to database");
  app.listen(PORT, () => {
    console.log("Server.js is listening on port " + PORT);
  });
  console.groupEnd();
});
