import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  posts,
  users,
  sleep,
} from "./fakedb";

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());

// TODO: Obviously use a more secure signing key than "secret"
app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/posts", async (req, res) => {
  // Sleep delay goes here
  res.json(posts);
});

// ⭐️ TODO: Implement this yourself
app.get("/api/posts/:id", (req, res) => {
  // id needs to be a number to pull from posts array
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (post) {
    const user = users.find((user) => user.id === post.userId);
    if (user) {
      const postWithUser = { ...post, user };
      res.json(postWithUser);
    } else {
      res.status(404).json({ error: "User not found." });
    }
    res.json(post);
  } else {
    res.status(404).json({ error: "Post not found." });
  }
});

/**
 * Problems with this:
 * (1) Authorization Issues:
 *     What if you make a request to this route WITHOUT a token?
 *     What if you make a request to this route WITH a token but
 *     it's invalid/expired?
 * (2) Server-Side Validation Issues:
 *     What if you make a request to this route with a valid token but
 *     with an empty/incorrect payload (post)
 */
app.post("/api/posts", (req, res) => {
  const incomingPost = req.body;
  addPost(incomingPost);
  res.status(200).json({ success: true });
});

app.put("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const incomingPost = req.body;
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex !== -1) {
    posts[postIndex] = { ...posts[postIndex], ...incomingPost };
    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ error: "Post not found." });
  }
});

app.listen(port, () => console.log("Server is running"));
