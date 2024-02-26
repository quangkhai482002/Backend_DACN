import express from "express";
import apiController from "../controller/apiController";
import userController from "../controller/userController";
import groupController from "../controller/groupController";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAtion";

const router = express.Router();

/**
 *
 * @param {*} app : express app
 */
const checkUser = (req, res, next) => {
  const nonSecurePaths = ["/", "/login", "/register"];
  if (nonSecurePaths.includes(req.path)) {
    next();
  } else {
  }
};
const initApiRoutes = (app) => {
  // path, handle
  // restful api
  // get, post, put, patch, delete

  router.all("*", checkUserJWT, checkUserPermission);

  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);

  router.get(
    "/user/read",

    userController.readFunc
  );
  router.post("/user/create", userController.createFunc);
  router.put("/user/update", userController.updateFunc);
  router.delete("/user/delete", userController.deleteFunc);

  router.get("/group/read", groupController.readFunc);

  return app.use("/api/v1/", router);
};
export default initApiRoutes;
