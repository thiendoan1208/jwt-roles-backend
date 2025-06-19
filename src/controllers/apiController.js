const { createNewUser, handleSignIn } = require("../services/apiUser");

const createUser = async (req, res) => {
  try {
    if (!req.body.email || !req.body.phone || !req.body.password) {
      return res.status(200).json({
        EM: "Missing required parameter",
        EC: "1",
        data: "",
      });
    }

    const data = await createNewUser(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      data: "",
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      data: "",
    });
  }
};

const signInUser = async (req, res) => {
  try {
    const data = await handleSignIn(req.body);

    // Set Cookie
    res.cookie("jwt", data.DT.access_token, { httpOnly: true });

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      data: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      data: "",
    });
  }
};

const getUserList = async (req, res) => {};

const updateUser = async (req, res) => {};

const deleteUser = async (req, res) => {};

module.exports = {
  createUser,
  signInUser,
  getUserList,
  updateUser,
  deleteUser,
};
