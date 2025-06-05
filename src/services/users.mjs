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
  }
};

export { createNewUser, handleUserList };
