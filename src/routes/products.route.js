import { Router } from "express";
import { registerProduct } from "../controllers/products.controller.js";

const router = Router();

router.post('/register', registerProduct);

export default router;