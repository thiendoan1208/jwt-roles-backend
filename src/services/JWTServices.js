const db = require("../models/index");

const getGroupWithRoles = async (user) => {
  let roles = await db.Group.findAll({
    attributes: ["id", "name", "description"],
    where: { id: user.groupID },
    include: {
      model: db.Role,
      attributes: ["id", "url", "description"],
      through: { attributes: [] },
    },
    raw: true,
    nest: true,
  });
  return roles ? roles : [];
};

module.exports = {
  getGroupWithRoles,
};
