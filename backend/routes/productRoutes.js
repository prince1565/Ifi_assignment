import express from "express";
import { getProducts, getProductBySlug } from "../controllers/productController.js";

const router = express.Router();

// All Products
router.get("/", getProducts);

// Single Product by slug
router.get("/:slug", getProductBySlug);

export default router;



