// import { raw } from "body-parser";
import db from "../models/index";

const getGroupWithRole = async (user) => {
  let roles = await db.Group.findOne({
    where: { id: user.groupID },
    include: [
      {
        model: db.Role,
        attributes: ["id", "url", "description"],
        through: { attributes: [] }, // remove all attributes from join table
      },
    ],
  });
  //   console.log("roles: ", roles);
  return roles ? roles : {};
};
module.exports = {
  getGroupWithRole,
};
