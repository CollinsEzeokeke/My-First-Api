import express from "express";
import UserRoutes from "../users/userRoutes";
import ProductsRoutes from "../products/productsRoutes";

const router = express.Router();

router.use(UserRoutes)
router.use(ProductsRoutes)


export default router;