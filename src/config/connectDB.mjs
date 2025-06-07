import { Sequelize } from "sequelize";

const sequelize = new Sequelize("jwt-roles", "root", "1208", {
  host: "localhost",
  dialect: "mysql",
  port: 8888,
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connection;
