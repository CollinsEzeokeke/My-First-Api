// middleware.ts
import { Request, Response, NextFunction, RequestHandler } from "express";
import { mockUsers } from "../../data/Users/mockUsers";
import {
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
  validatiorLoginSchema
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

  console.log(username, displayName);

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

// Middleware to authenticate the users logins
export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { data: { username, password } } = req;
  
    const findUser = mockUsers.find((user) => user.username === username);
    const getDisplayName = findUser?.displayName;
  
    req.session.user = findUser;
    req.session.displayName = getDisplayName;

    if(!findUser || findUser.password !== password){
      res.send({ msg: "Invalid username or password" }).status(401);
    }
    else {
     req.user = findUser; 
    }
    
    next();
  }

  // Middoleware to get the user authentication status
  export const userPosition = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
      req.message = "Authenticated user " + req.session.displayName;
    } else {
      req.message = "Not Authenticated";
    }
    next();
  }

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
    if (!results.isEmpty()) {
      return res
        .status(400)
        .send({ errors: results.array().map((error) => error.msg) });
    }
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
    req.data = data;
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
    req.data = data;
    next();
  },
];

// Validation for the login parameters
export const validatorLogin: RequestHandler[] = [
  ...checkSchema(validatiorLoginSchema),
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