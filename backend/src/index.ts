import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import { registerSocketHandlers } from "./socket.js";
import messageRoutes from "./routes/messages.js";
import usersRoutes from "./routes/users.js";
import meRoutes from "./routes/me.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // ✅ allow cookies!
  })
);
app.use(express.json());
app.use(cookieParser());

// REST endpoints
app.use("/api/messages", messageRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/me", meRoutes);

// WebSocket setup
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  registerSocketHandlers(socket, io);
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
