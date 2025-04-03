import { Router } from "express";
import { loginOrSignup } from "../controllers/user.js";

const router = Router();

router.route("/login").post(loginOrSignup);
router.route("/refresh-token").post(refreshToken);

export default router;
