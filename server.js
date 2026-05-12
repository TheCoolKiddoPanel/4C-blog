const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

const POSTS_FILE = "posts.json";

function getPosts() {
  const data = fs.readFileSync(POSTS_FILE);
  return JSON.parse(data);
}

function savePosts(posts) {
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
}

app.get("/api/posts", (req, res) => {
  const posts = getPosts();
  res.json(posts);
});

app.post("/api/posts", (req, res) => {
  const posts = getPosts();

  const newPost = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content,
    image: req.body.image
  };

  posts.unshift(newPost);

  savePosts(posts);

  res.json({
    success: true,
    post: newPost
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});