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

const checkUserJWT = (req, res, next) => {
  let cookies = req.cookies;
  if (cookies && cookies.jwt) {
    let token = cookies.jwt;
    let decoded = verifyJWT(token);

    if (decoded) {
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({
        EM: "User is not authenticated",
        EC: 1,
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EM: "User is not authenticated",
      EC: 1,
      DT: "",
    });
  }
};

const checkUserPermission = (req, res, next) => {
  if (req.user) {
    let email = req.user.email;
    let roles = req.user.roles;
    let currentURL = req.path;
    let canAccess = roles.some((role) => role.Roles.url === currentURL);

    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EM: "You dont have permission to access this",
        EC: 1,
        DT: "",
      });
    }

    if (canAccess) {
      next();
    } else {
      return res.status(403).json({
        EM: "You dont have permission to access this",
        EC: 1,
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EM: "User is not authenticated",
      EC: 1,
      DT: "",
    });
  }
};

module.exports = {
  createJWT,
  verifyJWT,
  checkUserJWT,
  checkUserPermission,
};
