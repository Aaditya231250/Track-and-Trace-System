import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerUser } from "../controllers/clients.controller.js";
import { loginUser } from "../controllers/clients.controller.js";
import { logoutUser } from "../controllers/clients.controller.js";

const router = Router()

// Suggested code may be subject to a license. Learn more: ~LicenseLog:3672697067.
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)

export default router