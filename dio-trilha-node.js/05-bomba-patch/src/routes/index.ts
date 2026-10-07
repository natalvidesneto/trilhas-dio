import { Router } from "express";
import bombaPatchRoutes from "./bombaPatchRoutes";

const router = Router();

router.use("/bomba-patch", bombaPatchRoutes);

export default router;