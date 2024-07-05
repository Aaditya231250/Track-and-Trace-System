import { Router } from "express";
import { registerUser } from "../controllers/clients.controller.js";

const router = Router()

// Suggested code may be subject to a license. Learn more: ~LicenseLog:3672697067.
router.route("/register").get(registerUser)

export default router