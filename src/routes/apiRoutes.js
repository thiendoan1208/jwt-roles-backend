const express = require("express");
const { signInUser, createUser, logoutUser } = require("../controllers/apiController");
const {
  handleCreateUser,
  handleListUser,
  handleUpdateUser,
  handledeleteUser,
} = require("../controllers/userController");
const { handleReadGroup } = require("../controllers/groupController");
const {
  checkUserJWT,
  checkUserPermission,
} = require("../middleware/JWTAction");

const apiRouter = express.Router();

apiRouter.all("/*splat", checkUserJWT, checkUserPermission);

// Sign in / Sign up User
apiRouter.post("/users/create-user", createUser);
apiRouter.post("/users/sign-in", signInUser);
apiRouter.post("/users/logout", logoutUser);

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
