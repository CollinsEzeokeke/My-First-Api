import express from "express";
import UserRoutes from "../users/userRoutes";
import ProductsRoutes from "../Products/productRoutes";

const router = express.Router();

router.use(UserRoutes)
router.use(ProductsRoutes)


export default router;