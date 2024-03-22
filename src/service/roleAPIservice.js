import { raw } from "body-parser";
import db from "../models/index";
import { or } from "sequelize";
const createNewRole = async (roles) => {
  try {
    let currentRoles = await db.Role.findAll({
      atrributes: ["url", "description"],
      raw: true,
    });
    // compare roles and currentRoles to get the difference
    const persist = roles.filter(
      ({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2)
    );
    if (persist.length === 0) {
      return {
        EC: 0,
        EM: "Nothing to create!",
        DT: [],
      };
    }
    await db.Role.bulkCreate(persist);
    return {
      EC: 0,
      EM: `Create new ${persist.length} role successfully!`,
      DT: [],
    };

    // await db.Role.bulkCreate(roles);
  } catch (error) {
    console.log(error);
    return {
      EC: 1,
      EM: "Some thing went wrong",
      DT: [],
    };
  }
};
const getAllRole = async () => {
  try {
    let data = await db.Role.findAll({
      order: [["id", "DESC"]],
    });
    return {
      EC: 0,
      EM: "Get all roles successfully!",
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EC: 1,
      EM: "Some thing went wrong",
      DT: [],
    };
  }
};
const deleteRole = async (id) => {
  try {
    let role = await db.Role.findOne({
      where: {
        id: id,
      },
    });
    if (role) {
      await role.destroy();
      return {
        EC: 0,
        EM: "delete OK",
        DT: [],
      };
    } else {
      return {
        EC: 0,
        EM: "Role not exist",
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EC: 1,
      EM: "Some thing went wrong",
      DT: [],
    };
  }
};
const getRoleByGroup = async (id) => {
  try {
    if (!id) {
      return {
        EC: 0,
        EM: "Not found group id!",
        DT: [],
      };
    }
    let roles = await db.Group.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "name", "description"],
      include: {
        model: db.Role,
        attributes: ["id", "url", "description"],
        through: { attributes: [] },
      },
    });
    return {
      EC: 0,
      EM: "get role by group successfully!",
      DT: roles,
    };
  } catch (error) {
    console.log(error);
    return {
      EC: 1,
      EM: "Some thing went wrong",
      DT: [],
    };
  }
};
const assignRoleToGroup = async (data) => {
  try {
    console.log(data);
    await db.Group_Role.destroy({
      where: {
        groupID: +data.groupID,
      },
    });
    await db.Group_Role.bulkCreate(data.groupRoles);

    return {
      EC: 0,
      EM: "Assign role to group successfully!",
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EC: 1,
      EM: "Some thing went wrong",
      DT: [],
    };
  }
};
module.exports = {
  createNewRole,
  getAllRole,
  deleteRole,
  getRoleByGroup,
  assignRoleToGroup,
};
