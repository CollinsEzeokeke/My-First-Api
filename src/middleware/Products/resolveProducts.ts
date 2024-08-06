import { Request, Response, NextFunction, RequestHandler } from "express";
import { mockProducts } from "../../data/Products/mockProducts";
import { checkSchema, validationResult } from "express-validator";
import { queryValidationSchema } from "../../utils/productFieldValidation/validationSchema";
import Product from "../../interfaces/Products/Products";

// Middleware made to resolve all the products according to what is needed at the time

// getting the products by id
export const getProductById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const parsedId = parseInt(req.params.id);
  const product = mockProducts.find((product) => product.id === parsedId);
  if (!product) {
    res.status(404).json({
      message: `No product found with id ${parsedId}`,
    });
    return;
  }
  req.product = product;
  next();
};

// resolving the products by queery parameters
export const filterByQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { category, name } = req.query;
  if (category || name) {
    console.log(category, name);
    req.product = mockProducts.filter(
      (product) =>
        (category && product.category === category) ||
        (name && product.name === name)
    );
  }
  next();
};

// Id parser
export const idParser = (req: Request, res: Response, next: NextFunction) => {
  const parsedId = parseInt(req.params.id);
  req.product = mockProducts.find((product) => product.id === parsedId);
  next();
};

// resolving the updated products
export const makeAnUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = req.product as Product;
  console.log(typeof(product));
  if (!product) {
    res.json({"message": "No product found with that id"}).status(404);
  }
  mockProducts.push(product);
  req.product = product;
  next();
};

// Validator for the query parameters
export const validatorQuery: RequestHandler[] = [
  ...checkSchema(queryValidationSchema),
  (req: Request, res: Response, next: NextFunction) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
      return res
        .status(400)
        .send({ errors: results.array().map((error) => error.msg) });
    }
    next();
  },
];
