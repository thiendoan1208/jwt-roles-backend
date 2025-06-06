import express from "express";
import {
  getHomePage,
  getUserPage,
  createUser,
  getUserList,
  deleteUser,
  updateUserPage,
  updateUser,
} from "../controllers/homeControllers.mjs";

const router = express.Router();

router.get("/", getHomePage);
router.get("/new-user", getUserPage);
router.get("/update-user-page/:userID", updateUserPage);

// CRUD User
router.post("/users/create-user", createUser);
router.get("/users/user-list", getUserList);
router.post("/users/delete-user/:userID", deleteUser);
router.post("/users/update-user", updateUser);

export default router;
