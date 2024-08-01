// middleware.ts
import { Request, Response, NextFunction, RequestHandler } from "express";
import { mockUsers } from "../../data/Users/mockUsers";
import {
  query,
  validationResult,
  matchedData,
  checkSchema,
} from "express-validator";
import {
  validationSchema,
  validationSchemaQuery,
  validationSchemaId,
  validationSchemaUpdate,
  validationSchemaUpdateOptional,
} from "../../utils/userFieldValidations/validationSchema";

// Middleware to resolve users by ID
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

// Middleware to resolve users by filter query
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

//Validation for the id parameter
export const validatorId: RequestHandler[] = [
  ...checkSchema(validationSchemaId),
  (req: Request, res: Response, next: NextFunction) => {
    const results = validationResult(req);
    console.log(results);
    if (!results.isEmpty()) {
      return res
        .status(400)
        .send({ errors: results.array().map((error) => error.msg) });
    }
    next();
  },
];

// Validation for the query parameters
export const validator: RequestHandler[] = [
  ...checkSchema(validationSchemaQuery),

  (req: Request, res: Response, next: NextFunction) => {
    const results = validationResult(req);
    console.log(results);
    next();
  },
];

// Validation for the creation of users
export const validatorCreate: RequestHandler[] = [
  ...checkSchema(validationSchema),
  (req: Request, res: Response, next: NextFunction) => {
    const results = validationResult(req);
    console.log(results);
    if (!results.isEmpty()) {
      return res
        .status(400)
        .send({ errors: results.array().map((error) => error.msg) });
    }
    const data = matchedData(req);
    (req as any).data = data; // Casting to any to avoid TypeScript error
    next();
  },
];

// Validation for the update parameters
export const validatorUpdate: RequestHandler[] = [
  ...checkSchema(validationSchemaUpdate),
  (req: Request, res: Response, next: NextFunction) => {
    const results = validationResult(req);
    console.log(results);
    if (!results.isEmpty()) {
      return res
        .status(400)
        .send({ errors: results.array().map((error) => error.msg) });
    }
    const data = matchedData(req);
    (req as any).data = data; // Casting to any to avoid TypeScript error
    next();
  },
];

// Validation for optional update parameters
export const validatorUpdateOptional: RequestHandler[] = [
  ...checkSchema(validationSchemaUpdateOptional),
  (req: Request, res: Response, next: NextFunction) => {
    const results = validationResult(req);
    console.log(results);
    if (!results.isEmpty()) {
      return res
        .status(400)
        .send({ errors: results.array().map((error) => error.msg) });
    }
    const data = matchedData(req);
    (req as any).data = data; // Casting to any to avoid TypeScript error
    next();
  },
];
