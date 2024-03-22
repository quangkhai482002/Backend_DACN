// import userAPIService from "../service/userAPIService";
import roleAPIService from "../service/roleAPIservice";

const readFunc = async (req, res) => {
  try {
    let data = await roleAPIService.getAllRole();
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
    let data = await roleAPIService.createNewRole(req.body);
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

// const updateFunc = async (req, res) => {
//   try {
//     let data = await userAPIService.updateUser(req.body);
//     return res.status(200).json({
//       EM: data.EM,
//       EC: data.EC,
//       DT: data.DT,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       EC: -1,
//       EM: "Error from server",
//       DT: "",
//     });
//   }
// };

const deleteFunc = async (req, res) => {
  try {
    let data = await roleAPIService.deleteRole(req.body.id);
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
const getRoleByGroup = async (req, res) => {
  try {
    let id = req.params.groupId;
    let data = await roleAPIService.getRoleByGroup(id);
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
const assignRoleToGroup = async (req, res) => {
  try {
    let data = await roleAPIService.assignRoleToGroup(req.body);
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
module.exports = {
  readFunc,
  createFunc,
  deleteFunc,
  getRoleByGroup,
  assignRoleToGroup,
};
