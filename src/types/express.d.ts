import User from "../interfaces/User";
import { ValidationError, Location } from "express-validator";

declare global {
  namespace Express {
    interface Request {
      user?: User | User[];
      'express-validator#contexts'?: Array<{
        location: Location;
        path: string;
        value: any;
        originalValue: any;
        param: string;
        msg: any;
        
      }>;
  }
}
}
