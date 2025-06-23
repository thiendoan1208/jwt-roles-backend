const express = require("express");
const {
  signInUser,
  createUser,
  logoutUser,
} = require("../controllers/apiController");
const {
  handleCreateUser,
  handleListUser,
  handleUpdateUser,
  handledeleteUser,
} = require("../controllers/userController");
const {
  handleCreateRole,
  handleListRole,
  handleUpdateRole,
  handledeleteRole,
} = require("../controllers/roleController");
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

// Roles
apiRouter.post("/role/create", handleCreateRole);
apiRouter.get("/role/list", handleListRole);
apiRouter.put("/role/update", handleUpdateRole);
apiRouter.delete("/role/delete", handledeleteRole);

module.exports = {
  apiRouter,
};
