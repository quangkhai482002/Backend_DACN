import { or } from "sequelize";
import db from "../models/index";
const getGroup = async () => {
  try {
    let data = await db.Group.findAll({
      // order by name A-Z
      order: [["name", "ASC"]],

      // order by name Z-A
      // order: [["name", "DESC"]],
    });
    return {
      EM: "Get group success",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EC: 1,
      EM: "error from service",
      DT: [],
    };
  }
};
module.exports = {
  getGroup,
};
