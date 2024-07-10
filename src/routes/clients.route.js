import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerClient } from "../controllers/clients.controller.js";
import { loginClient } from "../controllers/clients.controller.js";
import { logoutClient } from "../controllers/clients.controller.js";

const router = Router()

// Suggested code may be subject to a license. Learn more: ~LicenseLog:3672697067.
router.route("/register").post(registerClient)
router.route("/login").post(loginClient)
router.route("/logout").post(verifyJWT, logoutClient)

export default router