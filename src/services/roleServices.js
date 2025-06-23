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

    console.log(results);
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

module.exports = {
  createRole,
};
