const express = require("express");
const {
  signInUser,
  createUser,
  getUserList,
  updateUser,
  deleteUser,
} = require("../controllers/apiController");

const apiRouter = express.Router();

// Sign in user
apiRouter.post("/users/sign-in", signInUser);

// CRUD User
apiRouter.post("/users/create-user", createUser);
apiRouter.get("/users/user-list", getUserList);
apiRouter.post("/users/update-user", updateUser);
apiRouter.post("/users/delete-user/:userID", deleteUser);

module.exports = {
  apiRouter,
};
