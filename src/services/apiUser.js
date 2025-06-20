const db = require("../models/index");
const bcrypt = require("bcrypt");
const { hashPassword } = require("../config/hashPasword");
const { getGroupWithRoles } = require("./JWTServices");
const { createJWT } = require("../middleware/JWTAction");

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

const checkPassword = (inputPass, hashPassword) => {
  return bcrypt.compareSync(inputPass, hashPassword);
};

const createNewUser = async (userData) => {
  try {
    let isEmailExist = await checkEmailExist(userData.email);
    let isPhoneExist = await checkPhoneExist(userData.phone);

    if (isEmailExist) {
      return {
        EM: "Email is already exist",
        EC: 1,
        DT: "",
      };
    }

    if (isPhoneExist) {
      return {
        EM: "Phone is already exist",
        EC: 1,
        DT: "",
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
      groupID: 4,
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

const handleSignIn = async (data) => {
  try {
    let isEmailExist = await checkEmailExist(data.email);
    let user = await db.User.findOne({
      where: { email: data.email },
      raw: true,
    });

    if (!isEmailExist && !user) {
      return {
        EM: "Emal or password is not correct",
        EC: 1,
        DT: "",
      };
    } else {
      let isCorrectPassword = checkPassword(data.password, user.password);
      if (isCorrectPassword) {
        // Token
        let roles = await getGroupWithRoles(user);
        let payload = {
          email: user.email,
          roles,
        };
        let token = createJWT(payload);

        return {
          EM: "Login successfully",
          EC: 0,
          DT: {
            access_token: token,
            roles,
            email: user.email,
            username: user.username,
          },
        };
      } else {
        return {
          EM: "Emal or password is not correct",
          EC: 1,
          DT: "",
        };
      }
    }
  } catch (error) {
    return {
      EM: "Something wrong with server",
      EC: -1,
      data: "",
    };
  }
};

module.exports = {
  createNewUser,
  handleSignIn,
};
