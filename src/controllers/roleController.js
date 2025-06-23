const { createRole } = require("../services/roleServices");

const handleCreateRole = async (req, res) => {
  try {
    let data = await createRole(req.body);
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

const handleListRole = (req, res) => {};
const handleUpdateRole = (req, res) => {};
const handledeleteRole = (req, res) => {};

module.exports = {
  handleCreateRole,
  handleListRole,
  handleUpdateRole,
  handledeleteRole,
};
