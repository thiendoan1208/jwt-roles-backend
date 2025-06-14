const {
  createNewUser,
  getAllUser,
  updateUser,
  deleteUser,
} = require("../services/userCRUDService");

const handleCreateUser = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      data: "",
    });
  }
};

const handleListUser = async (req, res) => {
  try {
    let data = await getAllUser();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      data: "",
    });
  }
};

const handleUpdateUser = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      data: "",
    });
  }
};

const handledeleteUser = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      data: "",
    });
  }
};

module.exports = {
  handleCreateUser,
  handleListUser,
  handleUpdateUser,
  handledeleteUser,
};
