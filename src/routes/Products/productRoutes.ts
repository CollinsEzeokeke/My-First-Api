import express from "express";
import { deleteProductResolver, idParser, newProduct, updateProductContent, validatorCreateProduct, validatorTargetedUpdate, validatorUpdateProduct } from '../../middleware/Products/resolveProducts';
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

// get a product by the query parameter
router.get("/api/product", validatorQuery, filterByQuery, getProductsByQuery);

// get a single product by id
router.get("/api/products/:id", getProductById, getProduct);

// Create a new product
router.post("/api/products/", validatorCreateProduct, newProduct, createProduct);

// Update a product
router.put("/api/products/:id",validatorUpdateProduct, idParser, makeAnUpdate, updateProduct);

// Update certain fields of a product
router.patch("/api/products/:id",validatorTargetedUpdate, idParser, updateProductContent, targetedUpdateProduct);

// Delete a product
router.delete("/api/products/:id", idParser, deleteProductResolver, deleteProduct);

export default router;
