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
  const { filter, value } = req.query as { filter: string; value: string };
  // when filter and value are undefined it'll return all users if both are then it returns the filtered users and their values
  if (!filter && !value) {
    res.json(mockUsers).status(200);
  } else {
    res.json(
      mockUsers.filter((user) => {
        const filterType = filter as keyof typeof user;
        // if filter type is username then it'll return the filtered users and their values and if it's displayName then it'll return the filtered users and their displayNames and if it's a number then it'll return the filtered users and their ids
        if (
          filterType === "username" ||
          filterType === "displayName" ||
          filterType === "id"
        ) {
          const returnedUser = user[filterType].toString().includes(value);
          return returnedUser;
        }
      })
    );
  }

  next();
};
