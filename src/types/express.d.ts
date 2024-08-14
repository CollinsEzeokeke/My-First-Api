import User from "../interfaces/User/User";
import Product from "../interfaces/Products/Products";
import { ValidationError, Location } from "express-validator";

declare global {
  namespace Express {
    interface Request {
      data?: any;
      user?: User | User[];
      product?: Product | Product[];
      "express-validator#contexts"?: Array<{
        location: Location;
        path: string;
        value: any;
        originalValue: any;
        param: string;
        msg: any;
      }>;
    }
    // Types for the error object
interface CustomError extends Error {
  status? : number;
  message: string;
  errors?: ValidationError[];
}
  }
}

declare module "express-session" {
  interface SessionData {
    visited?: boolean;
    user?: User | User[];
  }
}
