import {
  createNewUser,
  handleUserList,
  handleDeleteUser,
  getUserByID,
  handleUpdateUser,
} from "../services/users.mjs";

const getHomePage = (req, res) => {
  return res.render("home.ejs");
};

const getUserPage = (req, res) => {
  return res.render("user.ejs");
};

// create user
const createUser = async (req, res) => {
  try {
    await createNewUser(req.body);
    return res.redirect("/users/user-list");
  } catch (error) {
    console.log(error);
  }
};

// user list
const getUserList = async (req, res) => {
  try {
    const userList = await handleUserList();
    return res.render("user-table.ejs", { userList });
  } catch (error) {
    console.log(error);
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    await handleDeleteUser(req.params.userID);
    return res.redirect("/users/user-list");
  } catch (error) {
    console.log(error);
  }
};

const updateUserPage = async (req, res) => {
  try {
    const user = await getUserByID(req.params.userID);
    return res.render("update-user-page.ejs", { user });
  } catch (error) {
    console.log(error);
  }
};
const updateUser = async (req, res) => {
  try {
    await handleUpdateUser(req.body);
    return res.redirect("/users/user-list");
  } catch (error) {
    console.log(error);
  }
};

export {
  getHomePage,
  getUserPage,
  createUser,
  getUserList,
  deleteUser,
  updateUserPage,
  updateUser,
};
