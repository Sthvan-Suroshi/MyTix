import { Router } from "express";
import { loginOrSignup, refreshToken } from "../controllers/user.js";

const router = Router();

router.route("/login").post(loginOrSignup);
router.route("/refresh-token").post(refreshToken);

export default router;
