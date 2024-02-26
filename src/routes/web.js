import express from "express";
import homeController from "../controller/homeController";
import apiController from "../controller/apiController";

const router = express.Router();

/**
 *
 * @param {*} app : express app
 */
const handleHello = (req, res) => {
  return res.send("Hello khai");
};
// get(path, handle)

const initWebRoutes = (app) => {
  //========   C1  ==========
  router.get("/", (req, res) => {
    return res.send("Hello Wolrd");
  });

  //=========  C2  ==========
  router.get("/about", handleHello);

  //=========  C3  ==========
  router.get("/aboutworld", homeController.handleHelloWorld);
  router.get("/user", homeController.handleUserPage);
  router.post("/users/create-user", homeController.handleCreateNewUser);
  router.post("/delete-user/:id", homeController.handleDeleteUser);
  router.get("/update-user/:id", homeController.getUpdateUser);
  router.post("/users/update-user", homeController.handleUpdateUser);

  // restful api
  // get, post, put, patch, delete
  // router.get("/api/test-api", apiController.testAPI);

  return app.use("/", router);
};
export default initWebRoutes;
