import connection from "../configs/db.mjs";
import { hashPassword } from "../configs/hashpasword.mjs";

const createNewUser = async (req) => {
  let { email, username, password } = req;
  let encriptedPassword = await hashPassword(password);

  try {
    await connection.execute(
      `INSERT INTO users (email, username, password) values (?, ?, ?)`,
      [email, username, encriptedPassword]
    );
  } catch (err) {
    console.log(err);
  }
};

const handleUserList = async () => {
  try {
    const [result] = await connection.execute(`SELECT * from users`);
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getUserByID = async (userID) => {
  try {
    const [result] = await connection.execute(
      `SELECT * from users WHERE id = ?`,
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
    await connection.execute(`DELETE FROM users WHERE id = ?`, [userID]);
  } catch (err) {
    console.log(err);
  }
};

const handleUpdateUser = async (reqBody) => {
  const { email, username, id } = reqBody;
  tryk {
    await connection.execute(
      `UPDATE users
      SET email = ?, username = ?
      WHERE id = ?`,
      [email, username, id]
    );
  } catch (err) {
    console.log(err);
  }
};

export {
  createNewUser,
  handleUserList,
  handleDeleteUser,
  getUserByID,
  handleUpdateUser,
};
