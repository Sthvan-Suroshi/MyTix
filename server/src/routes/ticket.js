import { Router } from "express";
import { bookTicekt, getUserTicket } from "../controllers/ticket.js";
import verifyToken from "../middleware/verify.js";

const router = Router();

// router.use(verifyToken);
router.route("/book").post(bookTicekt);
router.route("/my-tickets").get(getUserTicket);

export default router;
