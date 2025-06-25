const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();

const nonSecurePaths = [
  "/",
  "/users/create-user",
  "/users/sign-in",
  "/users/logout",
];

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

const extractBearerToken = (req, res) => {
  if (
    req.header.authorization &&
    req.header.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.header.authorization.split(" ")[1];
  }

  return null;
};

const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) {
    return next();
  }

  let cookies = req.cookies;
  const tokenFromHeader = extractBearerToken(req);

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
  if (nonSecurePaths.includes(req.path)) {
    return next();
  }

  if (req.user) {
    let email = req.user.email;
    let roles = req.user.roles;
    let currentURL = req.path;
    let canAccess = roles.some(
      (role) =>
        role.Roles.url === currentURL || currentURL.startsWith(role.Roles.url)
    );

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
