const express = require("express");
const {
  createUser,
  getUserList,
  updateUser,
  deleteUser,
} = require("../controllers/apiController");

const apiRouter = express.Router();

// CRUD User
apiRouter.post("/users/create-user", createUser);
apiRouter.get("/users/user-list", getUserList);
apiRouter.post("/users/update-user", updateUser);
apiRouter.post("/users/delete-user/:userID", deleteUser);

module.exports = {
  apiRouter,
};
