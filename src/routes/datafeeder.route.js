import { Router } from "express";
import { createRelation } from "../controllers/relation.controller.js";

const router = Router()

router.route("/relation").post(createRelation)

export default router