import {
  createNewUser,
  handleUserList,
  handleDeleteUser,
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
    res.render("user-table.ejs", { userList });
  } catch (error) {
    console.log(error);
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    await handleDeleteUser(req.params.userID);
    res.redirect("/users/user-list");
  } catch (error) {
    console.log(error);
  }
};

export { getHomePage, getUserPage, createUser, getUserList, deleteUser };
