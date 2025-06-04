import express from "express";
import { getHomePage } from "../controllers/homeControllers.mjs";

const router = express.Router();

router.get("/", getHomePage);

export default router;
