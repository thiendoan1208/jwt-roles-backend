const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();

const createJWT = (payload) => {
  try {
    let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
  } catch (error) {
    console.log("Wrong");
    return null;
  }
};

const verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.log("Wrong");
    return null;
  }
};

module.exports = {
  createJWT,
  verifyJWT,
};
