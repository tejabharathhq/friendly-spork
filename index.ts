import express from "express";
import { createServer } from "http"; // Change from "node:http" to "http"
import cors from "cors";
import { Server } from "socket.io";
import { connectDb, getUserDb, getSessionDb } from "./lib/db";
import { Bcrypt } from "oslo/password";

await connectDb();

const app = express();
app.use(cors());
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Change this to your desired origin or leave it as "*" to allow all origins
  },
});

app.get("/", (req, res) => {
  console.log("accessed");
  res.send("<h1>Hello world</h1>");
});

app.get("/create-user", async (req, res) => {
  const { username, password, email } = req.query;
  if (username && password && email) {
    const Users = getUserDb();
    const user = await Users.findOne({ username: username });
    console.log(user)
    if (user != null) {
      res.send(`<h1> ${username} already exists!</h1>`);
    } else {
      const bcrypt = new Bcrypt();
      const hashedPassword = await bcrypt.hash(password as string);

      Users.insertOne({
        email: email as string,
        username: username as string,
        password: hashedPassword,
      });
    }
  } else {
    res.send(`<h1> Username or password or email not found</h1>`);
  }
});

io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);
  socket.on("lead-scraped", (data) => {
    console.log(data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(process.env.PORT, () => {
  console.log(`server running at http://localhost:${process.env.PORT}`);
});
