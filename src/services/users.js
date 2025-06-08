const { hashPassword } = require("../config/hashpasword.js");
const { connection } = require("../config/db.js");
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
    const [result] = await connection.execute(`SELECT * from Users`);
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getUserByID = async (userID) => {
  try {
    const [result] = await connection.execute(
      `SELECT * from Users WHERE id = ?`,
      [userID]
    );
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const handleDeleteUser = async (userID) => {
  try {
    await connection.execute(`DELETE FROM Users WHERE id = ?`, [userID]);
  } catch (err) {
    console.log(err);
  }
};

const handleUpdateUser = async (reqBody) => {
  const { email, username, id } = reqBody;
  try {
    await connection.execute(
      `UPDATE Users
      SET email = ?, username = ?
      WHERE id = ?`,
      [email, username, id]
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
