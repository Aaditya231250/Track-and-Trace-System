import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { loginDistributor, registerDistributor } from "../controllers/distributors.controller.js";
import { logoutDistributor } from "../controllers/distributors.controller.js";

const router = Router()

router.route("/register").post(registerDistributor)
router.route("/login").post(loginDistributor)
router.route("/logout").post(verifyJWT, logoutDistributor)


export default router