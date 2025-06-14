const db = require("../models");

const createNewUser = () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const getAllUser = async () => {
  try {
    let userList = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
      raw: true,
      nest: true,
    });

    if (userList) {
      return {
        EM: "Get user list success",
        EC: 0,
        DT: userList,
      };
    } else {
      return {
        EM: "Get user list success",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with the server",
      EC: 1,
      DT: [],
    };
  }
};

const updateUser = () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNewUser,
  getAllUser,
  updateUser,
  deleteUser,
};
