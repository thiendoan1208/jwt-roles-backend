const { getAllGroups } = require("../services/groupService");

const handleReadGroup = async (req, res) => {
  try {
    let data = await getAllGroups();
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
  handleReadGroup,
};
