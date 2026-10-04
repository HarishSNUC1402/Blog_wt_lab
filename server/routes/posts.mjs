import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of 50 posts
router.get("/", async (req, res) => {
  let collection = await db.collection("posts");
  let results = await collection.find({}).limit(50).toArray();
  res.send(results).status(200);
});

// Get a single post
router.get("/:id", async (req, res) => {
  let collection = await db.collection("posts");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Create a new post
router.post("/", async (req, res) => {
  let newDocument = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date()
  };
  let collection = await db.collection("posts");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// Update a post by id
router.patch("/:id", async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    }
  };

  let collection = await db.collection("posts");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

// Delete an entry
router.delete("/:id", async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };

  let collection = await db.collection("posts");
  let result = await collection.deleteOne(query);
  res.send(result).status(200);
});

export default router;
