// src/middleware.js
import { verifyToken } from '@/lib/auth';

export function withAuth(handler) {
  return async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authorization.split(' ')[1];

    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}
