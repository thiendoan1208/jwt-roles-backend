import express from "express";
import {
  getHomePage,
  getUserPage,
  createUser,
  getUserList,
} from "../controllers/homeControllers.mjs";

const router = express.Router();

router.get("/", getHomePage);
router.get("/new-user", getUserPage);
router.post("/users/create-user", createUser);
router.get("/users/user-list", getUserList);

export default router;
