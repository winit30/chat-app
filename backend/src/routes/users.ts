import { Router } from "express";
import type { User } from "../types.js";
import { signJwt } from "../lib/jwt.js";

const router = Router();
export const users: User[] = [];

router.get("/", (_req, res) => {
  res.json(users);
});

router.post("/", (req, res) => {
  const { name, email, image } = req.body;

  const isExistingUser = users.find((u) => u.email === email);

  const newUser: User = isExistingUser || {
    id: Date.now().toString(),
    name,
    email,
    image: `${image}${users.length}`,
  };

  if (!isExistingUser) {
    users.push(newUser);
  }

  const token = signJwt({ userId: newUser.id });
  res
    .cookie("access-token", token, {
      httpOnly: true,
      secure: false, // set to true in production (HTTPS)
      sameSite: "lax",
    })
    .status(201)
    .json(newUser);
});

export default router;
