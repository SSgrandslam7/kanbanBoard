import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

  if (!token) return res.status(401).json({ message: 'Access token missing' });

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('Missing JWT secret in env');

    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.user = decoded; // You must have extended `Request` to include `user`

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
