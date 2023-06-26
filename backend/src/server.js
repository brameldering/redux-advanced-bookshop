import express from "express";
import cors from "cors";
import { db, connectToDb } from "./db.js";

const app = express();
app.use(express.json());
app.use(cors());

// ===================== products =====================
// api to get all products
app.get("/api/products", async (req, res) => {
  console.log("app.get(/api/products)");
  try {
    const products = await db.collection("products").find({}).toArray();
    res.json(products);
  } catch (error) {
    // TO DO: add error handling
    console.log("Error in app.get(/api/products)");
    console.error(error);
  }
});

// api to get a single product based on id
app.get("/api/products/:id", async (req, res) => {
  console.log("app.get(/api/products/:id)");
  const id = req.params.id;
  console.log("id: " + id);
  try {
    const product = await db.collection("products").findOne({ id: Number(id) });
    res.json(product);
  } catch (error) {
    // TO DO: add error handling
    console.log("Error in app.get(/api/products/:id)");
    console.error(error);
  }
});

// api to add a new product
app.post("/api/products", async (req, res) => {
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
    console.log("in try of app.post(/api/products)");
    console.log(result);
    res.json(result);
  } catch (error) {
    // TO DO: add error handling
    console.log("Error in app.post(/api/products)");
    console.error(error);
  }
});

// ===================== cart =====================
// api to load cart based on user
app.get("/api/carts/:user", async (req, res) => {
  console.log("app.get(/api/carts/:user)");
  const user = req.params.user;
  console.log("user: " + user);
  try {
    const cart = await db.collection("carts").findOne({ user: user });
    console.log("app.get(/api/carts/:user)  --> cartData:");
    console.log(cart);
    res.json(cart);
  } catch (error) {
    // TO DO: add error handling
    console.log("Error in app.get(/api/carts/:user)");
    console.error(error);
  }
});

// api to update current cart
app.put("/api/carts", async (req, res) => {
  console.log("app.put(/api/carts) " + new Date());
  let result = {
    acknowledged: false,
  };
  const cart = req.body;
  const user = cart.user;
  const items = cart.items;
  const totalQuantity = cart.totalQuantity;
  console.log(items);
  if (!cart) {
    res.status(400).json({ error: "Invalid cart" });
    return;
  }
  if (!user) {
    res.status(400).json({ error: "No cart user specified in body" });
    return;
  }
  try {
    const now = new Date();
    result = await db.collection("carts").updateOne(
      { user: user },
      {
        $set: {
          items: items,
          totalQuantity: totalQuantity,
          lastUpdated: now,
          lastUpdatedDateOffset: now.getTimezoneOffset(),
        },
      },
      {
        upsert: true,
        multi: true,
      }
    );
    console.log("in try of app.put(/api/carts");
    console.log(result);
  } catch (error) {
    console.log("Error in app.put(/api/carts");
    console.error(error);
  } finally {
    console.log("in finally of app.put(/api/carts");
    console.log(result);
    res.json(result);
  }
});

// ================== connect to DB ===================
// allow for environment variable PORT with a default of 8000 (for dev)
const PORT = process.env.PORT || 8000;

connectToDb(() => {
  console.log("Succesfully connected to database");
  app.listen(PORT, () => {
    console.log("Server.js is listening on port " + PORT);
  });
});
