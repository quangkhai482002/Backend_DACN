import userSevice from "../service/userService.js";

const handleHelloWorld = (req, res) => {
  const name = "Khai";
  return res.render("home.ejs", { name });
};

const handleUserPage = async (req, res) => {
  // Cookies that have not been signed
  // console.log("Cookies: ", req.cookies);

  // // Cookies that have been signed
  // console.log("Signed Cookies: ", req.signedCookies);

  //model -> get data from db
  let userList = await userSevice.getUserList();
  // console.log("check userList: ", userList);

  await userSevice.deleteUser(4);
  return res.render("user.ejs", { userList });
};
const handleCreateNewUser = (req, res) => {
  // console.log("check request: ", req.body);
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;
  userSevice.createNewUser(email, password, username);

  return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
  // console.log("check params: ", req.params.id);
  await userSevice.deleteUser(req.params.id);
  return res.redirect("/user");
};

const getUpdateUser = async (req, res) => {
  let id = req.params.id;
  let user = await userSevice.getUserById(id);
  let userData = {};
  userData = user;
  console.log("check user: ", user);
  //c1: ------ use mysql2 -----------
  // if (user && user.length > 0) {
  //   userData = user[0];
  // }
  //---------------------------------

  //c2: ------ use sequelize ------

  return res.render("user-update.ejs", { userData });
};

const handleUpdateUser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;
  let id = req.body.id;
  console.log("check body: ", req.body);
  await userSevice.updateUserData(email, password, username, id);
  return res.redirect("/user");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  getUpdateUser,
  handleUpdateUser,
};
