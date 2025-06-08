import { Router } from "express";
import type { Message } from "../types.js";

const router = Router();

// In-memory fake DB
const messages: Message[] = [];

router.get("/", (req, res) => {
  res.json(messages);
});

router.post("/", (req, res) => {
  const message: Message = {
    id: Date.now().toString(),
    senderId: req.body.senderId,
    receiverId: req.body.receiverId,
    content: req.body.content,
    timestamp: Date.now(),
  };

  messages.push(message);
  res.status(201).json(message);
});

export default router;
