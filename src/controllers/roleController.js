const {
  createRole,
  getAllRoles,
  deleteRole,
  getRolesByGroup,
} = require("../services/roleServices");

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

const handleListRole = async (req, res) => {
  try {
    let data = await getAllRoles();
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

const handledeleteRole = async (req, res) => {
  try {
    let roleID = req.query.roleID;
    let data = await deleteRole(roleID);

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

const handleGetRoleByGroup = async (req, res) => {
  try {
    let groupId = req.params.groupID;
    let data = await getRolesByGroup(groupId);

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
  handleCreateRole,
  handleListRole,
  handleGetRoleByGroup,
  handledeleteRole,
};
