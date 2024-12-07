import express from "express";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  let party = socket.handshake.query.party;
  console.log("party: ", party);

  if (party == "alice") {
    console.log("Alice joined the party");
    socket.broadcast.emit("user", "alice");
  }

  let conn_id = socket.id;

  socket.on("message", (data) => {
    console.log("Received user data:", data);
    socket.broadcast.emit("message", data);
  });

  socket.on("no_of_policy", (data) => {
    console.log("no_of_policy :", data);
    socket.broadcast.emit("no_of_policy", data);
  });


  socket.on("match_policy", (policy_index) => {
    console.log("match_policy (policy_index) :", policy_index);
    socket.broadcast.emit("match_policy", policy_index);
  });

  

  

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
