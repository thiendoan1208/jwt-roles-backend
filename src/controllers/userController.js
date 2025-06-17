const {
  createNewUser,
  getAllUser,
  getUserWithPagination,
  updateUser,
  deleteUser,
} = require("../services/userCRUDService");

const handleCreateUser = async (req, res) => {
  try {
    let data = await createNewUser(req.body);
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

const handleListUser = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;

      let data = await getUserWithPagination(+page, +limit);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
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

const handledeleteUser = async (req, res) => {
  try {
    let data = await deleteUser(req.query.id);
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

module.exports = {
  handleCreateUser,
  handleListUser,
  handleUpdateUser,
  handledeleteUser,
};
