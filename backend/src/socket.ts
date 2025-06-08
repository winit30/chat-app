import { Server, Socket } from "socket.io";
import type { Message } from "./types.js";

const userSocketMap = new Map<string, string>();

export function registerSocketHandlers(socket: Socket, io: Server) {
  socket.on("user:register", (userId: string) => {
    userSocketMap.set(userId, socket.id);
    socket.broadcast.emit("user:joined", { userId });
    socket.emit("users:online", Array.from(userSocketMap.keys()));
  });

  // When a user sends a message
  socket.on("message:send", (msg: Message) => {
    const receiverSocketId = userSocketMap.get(msg.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("message:receive", msg);
    }

    // Emit back to sender (confirmation or mirror)
    // socket.emit("message:receive", msg);
  });

  socket.on("disconnect", () => {
    const entry = [...userSocketMap.entries()].find(
      ([, sid]) => sid === socket.id
    );

    if (entry) {
      const [userId] = entry;
      userSocketMap.delete(userId);
      socket.broadcast.emit("user:left", { userId });
    }
  });

  // Optional: typing indicator
  socket.on("typing", (userId: string) => {
    socket.broadcast.emit("typing", userId);
  });
}
