import { Request, Response, NextFunction, RequestHandler } from "express";
import { mockProducts } from '../../data/Products/mockProducts';
import { checkSchema, matchedData, validationResult } from "express-validator";
import {
  createProductValidationSchema,
  productBodyValidationSchema,
  queryValidationSchema,
  targetedUpdateProductValidationSchema,
} from "../../utils/productFieldValidation/validationSchema";
import Product from "../../interfaces/Products/Products";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Middleware made to resolve all the products according to what is needed at the time

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
  const data = req.data;
  if ( data.name || data.price || data.category ) {
    req.product = mockProducts.filter(product =>
      (data.name && product.name === data.name) ||
      (data.price && product.price === data.price) ||
      (data.category && product.category === data.category)
    );
  }
  next();
  };

// Id parser
export const idParser = (req: Request, res: Response, next: NextFunction) => {
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

// resolving the updated products
export const makeAnUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = req.product as Product;
  const productIndex = mockProducts.findIndex((products) => products.id === product.id);
  if (productIndex === -1) {
    res.send({ message : "No product like that exists" }).status(404);
    return;
  }
  else {
    const updatedProduct = {...mockProducts[productIndex], ...req.data};
    mockProducts[productIndex] = updatedProduct;
    req.product = updatedProduct;
  }
  next();
};

// updating certain fields of the product for patch request
export const updateProductContent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = req.product as Product;
  console.log(product);
  const data = req.data;
  
  if (!product) {
    res.json({ message: "No product found with that id" }).status(404);
  }else{
    if (data.name) {
      product.name = data.name;
    }
    if (data.price) {
      product.price = data.price;
    }
    if (data.description) {
      product.description = data.description;
    }
    if (data.category) {
      product.category = data.category;
    }
    if (data.image) {
      product.image = data.image;
    }
    req.product = product;
    next();
  }
  
};

// resolving the created products
export const newProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, category, price, description, image } = req.body;
if (!name || !category || !price || !description || !image) {
  res.json({ message: "Please provide all the required fields" }).status(400);
}
const variable = req.data;
const newProduct = { id: mockProducts[mockProducts.length - 1].id + 1, ...variable };  
mockProducts.push(newProduct);
req.product = newProduct;
next();
};

// resolving the deleted products
export const deleteProductResolver = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = req.product as Product;
  if (!product) {
    res.send({ message : "No product like that exists" }).status(404);
  }
  const mockProductsIndex = mockProducts.findIndex((products) => products.id === product.id);
  if (mockProductsIndex === -1) {
    res.send({ message : "No product like that exists" }).status(404);
  }
  else {
    mockProducts.splice(mockProductsIndex, product.id);
    req.product = mockProducts[mockProductsIndex];
  }

  next();
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// All the middlewares for validations

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
    const data = matchedData(req);
    req.data = data;
    next();
  },
];

// Validator for the creation of a product
export const validatorCreateProduct: RequestHandler[] = [
  ...checkSchema(createProductValidationSchema),
  (req: Request, res: Response, next: NextFunction) => {
    const results = validationResult(req);
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

//validator for the update of a product
export const validatorUpdateProduct: RequestHandler[] = [
  ...checkSchema(productBodyValidationSchema),
  (req: Request, res: Response, next: NextFunction) => {
    const results = validationResult(req);
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

// validator for the update of specific fields of a product
export const validatorTargetedUpdate: RequestHandler[] = [
  ...checkSchema(targetedUpdateProductValidationSchema),
  (req: Request, res: Response, next: NextFunction) => {
    const results = validationResult(req);
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

// Validator for the idParser
 
