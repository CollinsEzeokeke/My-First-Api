import { Request, Response, NextFunction } from "express";
import { CustomError } from "../interfaces/User";


export const error = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (err.status) {
        console.log(`Error -------- ${err.message}`);
        return res
        .status(err.status)
        .json({msg: err.message});
    }res.status(500).json('Internal Server Error');
    next();
};