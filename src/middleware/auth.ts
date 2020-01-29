import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

interface IReq extends Request {
  user?: string;
}
// interface IDecode {
//   user: {
//     id: string
//   }
// }

export default function(req: IReq, res: Response, next: NextFunction) {
  //Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.log('no secret');
      return;
    }
    const decoded: any = jwt.verify(token, secret);
    console.log(decoded);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
  return;
}
