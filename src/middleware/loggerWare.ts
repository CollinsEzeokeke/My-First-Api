import { Request, Response, NextFunction } from "express";

export default function loggerWare(req: Request, res: Response, next: NextFunction) {
  console.log(req.method, req.url);
  next();
}