// Notify
import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const PORT = 3000;
const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
}); // Circiut

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  console.log("User Connected");
  console.log("id:", socket.id);
  socket.emit("welcome", `Welcome to the server, ${socket.id}`);

  socket.emit("hey", "Welcome Supra");
  socket.on("message", (data) => {
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Sevrer is running at ${PORT}`);
});
