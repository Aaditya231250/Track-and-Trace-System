import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { loginRetailer, registerRetailer } from "../controllers/retailers.controller.js";
import { logoutRetailer } from "../controllers/retailers.controller.js";

const router = Router()

router.route("/register").post(registerRetailer)
router.route("/login").post(loginRetailer)
router.route("/logout").post(verifyJWT, logoutRetailer)

export default router