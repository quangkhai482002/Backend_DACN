require("dotenv").config();
import jwt from "jsonwebtoken";

const nonScurePaths = ["/", "/login", "/register", "/logout"];
const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
  } catch (error) {
    console.log("error: ", error);
  }

  return token;
};
const verifyJWT = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (error) {
    console.log("error: ", error);
  }
  return decoded;
};

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};

const checkUserJWT = (req, res, next) => {
  if (nonScurePaths.includes(req.path)) {
    return next();
  }
  let cookies = req.cookies;
  let tokenFromHeader = extractToken(req);
  if ((cookies && cookies.jwt) || tokenFromHeader) {
    let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
    let decoded = verifyJWT(token);
    if (decoded) {
      req.user = decoded;
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        EM: "Not authorized user!",
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      EM: "Not authorized user!",
      DT: "",
    });
  }
};
const checkUserPermission = (req, res, next) => {
  if (nonScurePaths.includes(req.path) || req.path === "/account") {
    return next();
  }
  if (req.user) {
    let email = req.user.email;
    let role = req.user.groupWithRoles.Roles;
    let currentUrl = req.path; // Url hiện tại
    if (!role || role.length === 0) {
      return res.status(403).json({
        EC: -1,
        EM: "You don't have permission to access this recource!",
        DT: "",
      });
    }
    let canAceess = role.some(
      (item) => item.url === currentUrl || currentUrl.includes(item.url)
    );
    if (canAceess === true) {
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        EM: "You don't have permission to access this recource!",
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      EM: "Not authorized user!",
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
