import express from "express";
import cors from "cors";
import { db, connectToDb } from "./db.js";

const app = express();
app.use(express.json());
app.use(cors());

// api to get all products
app.get("/api/products", async (req, res) => {
  console.log("app.get(/api/products)");
  // console.log(db);
  const products = await db.collection("products").find({}).toArray();
  res.json(products);
});

// api to get a single product based on id
app.get("/api/products/:id", async (req, res) => {
  console.group();
  console.log("app.get(/api/products/:id)");
  const id = req.params.id;
  console.log("id: " + id);
  const product = await db.collection("products").findOne({ id: Number(id) });
  res.json(product);
  console.groupEnd();
});

// api to add a new product
app.post("/api/products", async (req, res) => {
  console.group();
  console.log("app.post(/api/products)");
  let result = {
    acknowledged: false,
  };
  const product = req.body;
  // TO DO: test the following
  if (!product) {
    res.status(400).json({ error: "Invalid product" });
    return;
  }
  try {
    result = await db.collection("products").insertOne(product);
    console.log("in try");
    console.log(result);
  } catch (error) {
    console.log("Error in app.post(/api/products)");
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
