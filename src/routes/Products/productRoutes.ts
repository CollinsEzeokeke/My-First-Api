import express from "express";
import { idParser, newProduct, updateProductContent, validatorCreateProduct, validatorTargetedUpdate, validatorUpdateProduct } from '../../middleware/Products/resolveProducts';
import {
  getProducts,
  getProduct,
  getProductsByQuery,
  createProduct,
  updateProduct,
  deleteProduct,
  targetedUpdateProduct,
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
router.get("/api/products/:id", getProductById, getProduct);

// get a product by the query parameter
router.get(
  "/api/products/query",
  validatorQuery,
  filterByQuery,
  getProductsByQuery
);

// Create a new product
router.post("/api/products", validatorCreateProduct, newProduct, createProduct);

// Update a product
router.put("/api/products/:id",validatorUpdateProduct, idParser, makeAnUpdate, updateProduct);

// Update certain fields of a product
router.patch("/api/products/update/:id",validatorTargetedUpdate, idParser, updateProductContent, targetedUpdateProduct);

// Delete a product
router.delete("/api/products/delete/:id", idParser, deleteProduct);

export default router;
