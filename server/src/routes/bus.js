import { Router } from "express";
import { getBusDetails, searchBuses } from "../controllers/bus.js";

const router = Router();

router.route("/search").post(searchBuses);
router.route("/:busId").get(getBusDetails);

export default router;
