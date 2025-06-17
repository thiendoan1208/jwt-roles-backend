const express = require("express");
const { signInUser, createUser } = require("../controllers/apiController");
const {
  handleCreateUser,
  handleListUser,
  handleUpdateUser,
  handledeleteUser,
} = require("../controllers/userController");

const { handleReadGroup } = require("../controllers/groupController");

const apiRouter = express.Router();

// Sign in / Sign up User
apiRouter.post("/users/create-user", createUser);
apiRouter.post("/users/sign-in", signInUser);

// CRUD User
apiRouter.post("/user/create", handleCreateUser);
apiRouter.get("/user/list", handleListUser);
apiRouter.put("/user/update", handleUpdateUser);
apiRouter.delete("/user/delete", handledeleteUser);

// Group
apiRouter.get("/group/read", handleReadGroup);

module.exports = {
  apiRouter,
};
