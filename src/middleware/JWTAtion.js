require("dotenv").config();
import jwt from "jsonwebtoken";

const nonScurePaths = ["/", "/login", "/register"];
const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key);
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

const checkUserJWT = (req, res, next) => {
  if (nonScurePaths.includes(req.path)) {
    return next();
  }
  let cookies = req.cookies;
  if (cookies && cookies.jwt) {
    let token = cookies.jwt;
    let decoded = verifyJWT(token);
    if (decoded) {
      req.user = decoded;
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
  if (nonScurePaths.includes(req.path)) {
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
    let canAceess = role.some((item) => item.url === currentUrl);
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
