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

    if (data && data.DT && data.DT.access_token) {
      // Set Cookie
      res.cookie("jwt", data.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }

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

const logoutUser = (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({
      EM: "Logout success",
      EC: 0,
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

module.exports = {
  createUser,
  signInUser,
  logoutUser,
};
