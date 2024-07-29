/// Middleware made to resolve the mock users by id
import { Request, Response, NextFunction } from "express";
import { mockUsers } from "../data/mockUsers";
import { query, validationResult } from "express-validator";

export const UsersResolvedById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const parseId = parseInt(req.params.id);
  const user = mockUsers.find((user) => user.id === parseId);
  if (!user) return res.status(404).send("User not found");
  req.user = user;
  console.log(`Hey there I logged the user ${user}`);

  next();
};

export const UsersResolvedByFilterQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, displayName } = req.query;

  if (username || displayName) {
    req.user = mockUsers.filter(user => 
      (username && user.username === username) || 
      (displayName && user.displayName === displayName)
    );
  } else {
    req.user = mockUsers;
  }
  
  next();
};

export const validator = [
  query('username').isString().optional(true).withMessage('Username is required'),
  query('displayName').isString().optional(true).withMessage('Display name is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const results = validationResult(req);
    console.log(results);
    if (!results.isEmpty()) {
      console.log(results.array());
      return res.status(400).send(results.array());
    }
    next();
  } 
];