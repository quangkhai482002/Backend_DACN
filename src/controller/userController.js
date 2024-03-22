import userAPIService from "../service/userAPIService";

const readFunc = async (req, res) => {
  try {
    // if (req.query.page && req.query.limit) {
    //   let page = req.query.page;
    //   let limit = req.query.limit;
    //   let data = await userAPIService.getUserWithPagination(+page, +limit);
    //   return res.status(200).json({
    //     EM: data.EM,
    //     EC: data.EC,
    //     DT: data.DT,
    //   });
    // } else {
    //   let data = await userAPIService.getAllUser();
    //   return res.status(200).json({
    //     EM: data.EM,
    //     EC: data.EC,
    //     DT: data.DT,
    //   });
    // }
    let data = await userAPIService.getAllUser();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EC: -1,
      EM: "Error from server",
      DT: "",
    });
  }
};

const createFunc = async (req, res) => {
  try {
    //validate
    let data = await userAPIService.createNewUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EC: -1,
      EM: "Error from server",
      DT: "",
    });
  }
};

const updateFunc = async (req, res) => {
  try {
    let data = await userAPIService.updateUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EC: -1,
      EM: "Error from server",
      DT: "",
    });
  }
};

const deleteFunc = async (req, res) => {
  try {
    let data = await userAPIService.deleteUser(req.body.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EC: -1,
      EM: "Error from server",
      DT: "",
    });
  }
};
const getUserAccount = async (req, res) => {
  // console.log("check user: ", req.user);
  return res.status(200).json({
    EM: "Get user account successfully",
    EC: 0,
    DT: {
      access_token: req.token,
      groupWithRoles: req.user.groupWithRoles,
      email: req.user.email,
      username: req.user.username,
    },
  });
};
module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
  getUserAccount,
};
