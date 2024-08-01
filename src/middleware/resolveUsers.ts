/// Middleware made to resolve the mock users by id
import { Request, Response, NextFunction } from "express";
import { mockUsers } from "../data/mockUsers";
import { query, validationResult, body, matchedData, checkSchema } from "express-validator";
import { validationSchema } from "../utils/validationSchema";

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
    req.user = mockUsers.filter(
      (user) =>
        (username && user.username === username) ||
        (displayName && user.displayName === displayName)
    );
  } else {
    req.user = mockUsers;
  }

  next();
};

//Validation for the providing the correct data required for the query
export const validator = [
  query("username")
    .isString()
    .optional()
    .isLength({ min: 6, max: 20 })
    .withMessage("Username must be between 6 and 20 characters"),
  query("displayName")
    .isString()
    .optional()
    .isLength({ min: 6, max: 35 })
    .withMessage("Display name must be between 6 and 35 characters"),

  (req: Request, res: Response, next: NextFunction) => {
    const results = validationResult(req);
    console.log(results);
    next();
  },
];

// Validation for the users to be created
export const validatorCreate = [
  checkSchema(validationSchema),
  (req: Request, res: Response, next: NextFunction) => {
    const results = validationResult(req);
    console.log(results);
    if (!results.isEmpty()) {
      return res
        .status(400)
        .send({ errors: results.array().map((error) => error.msg) });
    }
    const data = matchedData(req);
    req.data = data;
    next();
  },
];