import express, { Request, Response } from "express";
import { idParser } from '../../middleware/Products/resolveProducts';
import {
  getProducts,
  getProduct,
  getProductsByQuery,
  createProduct,
  updateProduct,
} from "../../controllers/products/productsController";
import {
  getProductById,
  filterByQuery,
  validatorQuery,
  makeAnUpdate,
} from "../../middleware/Products/resolveProducts";

const router = express.Router();

// get all products
router.get("/api/products", getProducts);

// get a single product by id
router.get("/api/products/findById/:id", getProductById, getProduct);

// get a product by the query parameter
router.get(
  "/api/products/query",
  validatorQuery,
  filterByQuery,
  getProductsByQuery
);

// Create a new product
router.post("/api/products", createProduct);

// Update a product
router.put("/api/products/update/:id", idParser, makeAnUpdate, updateProduct);  

export default router;
