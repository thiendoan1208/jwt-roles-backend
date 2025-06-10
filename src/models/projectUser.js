"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProjectUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  ProjectUser.init(
    {
      projectID: DataTypes.INTERGER,
      userID: DataTypes.INTERGER,
    },
    {
      sequelize,
      modelName: "ProjectUser",
    }
  );

  return ProjectUser;
};
