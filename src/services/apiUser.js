const db = require("../models/index");
const { hashPassword } = require("../config/hashPasword");

const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });

  if (user) {
    return true;
  } else {
    return false;
  }
};

const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone },
  });

  if (user) {
    return true;
  } else {
    return false;
  }
};

const createNewUser = async (userData) => {
  try {
    let isEmailExist = await checkEmailExist(userData.email);
    let isPhoneExist = await checkPhoneExist(userData.phone);

    if (isEmailExist) {
      return {
        EM: "Email is already exist",
        EC: 1,
      };
    }

    if (isPhoneExist) {
      return {
        EM: "Phone is already exist",
        EC: 1,
      };
    }

    let encriptedPassword = await hashPassword(userData.password);

    await db.User.create({
      email: userData.email,
      username: userData.username,
      password: encriptedPassword,
      sex: userData.sex,
      address: userData.address,
      phone: userData.phone,
    });

    return {
      EM: "A user is created successfully",
      EC: 0,
    };
  } catch (error) {
    return {
      EM: "Something wrong with server",
      EC: -1,
    };
  }
};

module.exports = {
  createNewUser,
};
