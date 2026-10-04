import "./loadEnvironment.mjs";
import express from "express";
import cors from "cors";
import posts from "./routes/posts.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/posts", posts);

// Global error handling
app.use((err, req, res, next) => {
  res.status(500).send("Something went wrong");
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
