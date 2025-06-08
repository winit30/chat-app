import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../lib/jwt.js";

export interface AuthRequest extends Request {
  user?: any;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies["access-token"];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const decoded = verifyJwt(token);
  if (!decoded) return res.status(401).json({ error: "Invalid token" });

  req.user = decoded;
  next();
}
