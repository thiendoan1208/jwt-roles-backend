import { createNewUser, handleUserList } from "../services/users.mjs";

const getHomePage = (req, res) => {
  return res.render("home.ejs");
};

const getUserPage = (req, res) => {
  return res.render("user.ejs");
};

const createUser = async (req, res) => {
  try {
    await createNewUser(req.body);
    return res.send("created");
  } catch (error) {
    console.log(error);
  }
};

const getUserList = async (req, res) => {
  try {
    const userList = await handleUserList();
    console.log(userList);
  } catch (error) {
    console.log(error);
  }
};

export { getHomePage, getUserPage, createUser, getUserList };
