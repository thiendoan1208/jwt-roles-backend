import express from "express";
import {
  getHomePage,
  getUserPage,
  createUser,
  getUserList,
  deleteUser,
} from "../controllers/homeControllers.mjs";

const router = express.Router();

router.get("/", getHomePage);
router.get("/new-user", getUserPage);

// CRUD User
router.post("/users/create-user", createUser);
router.get("/users/user-list", getUserList);
router.post("/users/delete-user/:userID", deleteUser);

export default router;
