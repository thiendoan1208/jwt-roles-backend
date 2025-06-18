const db = require("../models");
const { hashPassword } = require("../config/hashPasword");

const createNewUser = async (userData) => {
  let encriptedPassword = await hashPassword(userData.password);
  try {
    await db.User.create({
      email: userData.email,
      username: userData.username,
      password: encriptedPassword,
      sex: userData.sex,
      address: userData.address,
      phone: userData.phone,
      groupID: userData.groupID,
    });
    return {
      EM: "A user is created successfully",
      EC: 0,
      data: "",
    };
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

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    let { count, rows } = await db.User.findAndCountAll({
      attributes: [
        "id",
        "username",
        "email",
        "phone",
        "address",
        "sex",
        "groupID",
      ],
      include: { model: db.Group, attributes: ["name", "description"] },
      nest: true,
      offset: offset,
      limit: limit,
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      rows,
    };
    return {
      EM: "Success",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with the server",
      EC: 1,
      DT: [],
    };
  }
};

const updateUser = async (user) => {
  try {
    let data = await db.User.update(
      {
        email: user.email,
        username: user.username,
        phone: user.phone,
        address: user.address,
        sex: user.sex,
        groupID: user.groupID,
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    return {
      EM: "Update success",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with the server",
      EC: 1,
      DT: [],
    };
  }
};

const deleteUser = async (id) => {
  try {
    await db.User.destroy({
      where: {
        id: id,
      },
    });
    return {
      EM: "Delete user success",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with the server",
      EC: 1,
      DT: [],
    };
  }
};

module.exports = {
  createNewUser,
  getAllUser,
  getUserWithPagination,
  updateUser,
  deleteUser,
};
