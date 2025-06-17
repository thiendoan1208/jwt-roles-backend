const db = require("../models");

const getAllGroups = async () => {
  try {
    let data = await db.Group.findAll({
      raw: true,
      order: [["name", "ASC"]],
    });
    return {
      EM: "Success",
      EC: "0",
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Error from server",
      EC: "-1",
      data: "",
    };
  }
};

module.exports = {
  getAllGroups,
};
