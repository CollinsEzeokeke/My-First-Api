/// Middleware made to resolve the mock users by id
import { Request, Response, NextFunction } from "express";
import { mockUsers } from "../data/mockUsers";

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
  const { username, displayName } = req.query as {
    username: string;
    displayName: string;
  };
// if both username or displayName are provided, filter the users by username and displayName
  if (username || displayName) {
    const filteredUsers = mockUsers.filter((user) => {
      return user.username === username || user.displayName === displayName;
    });
    req.user = filteredUsers;
    return next();
  }
  //if neither username nor displayName is provided, return all users
  if (!username || !displayName) {
    return res.status(400).send("Username and DisplayName are required");
  }
  
  next();
};
