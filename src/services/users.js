const { hashPassword } = require("../config/hashpasword.js");
const db = require("../models");

const createNewUser = async (req) => {
  let { email, username, password } = req;
  let encriptedPassword = await hashPassword(password);

  try {
    await db.Users.create({
      username: username,
      email: email,
      password: encriptedPassword,
    });
  } catch (err) {
    console.log(err);
  }
};

const handleUserList = async () => {
  try {
    const result = await db.Users.findAll();
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getUserByID = async (userID) => {
  try {
    const user = await db.Users.findOne({
      where: { id: userID },
    });
    return user;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const handleDeleteUser = async (userID) => {
  try {
    await db.Users.destroy({
      where: { id: userID },
    });
  } catch (err) {
    console.log(err);
  }
};

const handleUpdateUser = async (reqBody) => {
  const { email, username, id } = reqBody;
  try {
    await db.Users.update(
      { email: email, username: username },
      { where: { id: id } }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createNewUser,
  handleUserList,
  handleDeleteUser,
  getUserByID,
  handleUpdateUser,
};
