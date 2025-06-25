const db = require("../models/index");

const createRole = async (roles) => {
  try {
    let currentRoles = await db.Role.findAll({
      attributes: ["url", "description"],
      raw: true,
    });

    // filter same roles
    const results = roles.filter(
      ({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url2 === url1)
    );

    if (results.length === 0) {
      return {
        EM: "Nothing to create",
        EC: 0,
        DT: "",
      };
    }

    await db.Role.bulkCreate(results);
    return {
      EM: `Create roles successfully ${results.length}`,
      EC: 0,
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something went wrong, cannot create roles",
      EC: 1,
      DT: "",
    };
  }
};

const getAllRoles = async () => {
  try {
    let data = await db.Role.findAll({
      attributes: ["id", "url", "description"],
    });
    return {
      EM: `Get roles success`,
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something went wrong, cannot create roles",
      EC: 1,
      DT: "",
    };
  }
};

const deleteRole = async (roleID) => {
  try {
    await db.Role.destroy({
      where: {
        id: roleID,
      },
    });
    return {
      EM: `Delete roles success`,
      EC: 0,
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something went wrong, cannot create roles",
      EC: 1,
      DT: "",
    };
  }
};

const getRolesByGroup = async (groupID) => {
  try {
    let data = await db.Group.findAll({
      where: { id: groupID },
      attributes: ["id", "name", "description"],
      include: {
        model: db.Role,
        attributes: ["id", "url", "description"],
        through: { attributes: [] },
      },
      raw: true,
      nest: true,
    });

    return {
      EM: `Get roles success`,
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something went wrong, cannot get roles",
      EC: 1,
      DT: "",
    };
  }
};

const updateRoleToGroup = async (data) => {
  let filterGroupID = data.find((item) => typeof item.groupID === "number");

  try {
    await db.GroupRole.destroy({
      where: {
        groupID: filterGroupID.groupID,
      },
    });

    await db.GroupRole.bulkCreate(data);
    return {
      EM: `Update roles success`,
      EC: 0,
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something went wrong, cannot update roles",
      EC: 1,
      DT: "",
    };
  }
};

module.exports = {
  createRole,
  getAllRoles,
  deleteRole,
  getRolesByGroup,
  updateRoleToGroup,
};
