import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth.js";
import { users } from "./users.js";

const router = Router();

router.get("/", authMiddleware, (req: AuthRequest, res) => {
  const userId = req.user.userId;
  const user = users.find((u) => u.id === userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
});

export default router;
