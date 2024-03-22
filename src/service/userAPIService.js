import db from "../models/index";
import { checkEmail, hashPassword } from "./loginRegisterService";

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: [
        "id",
        "email",
        "username",
        "password",
        "phone",
        "address",
        "sex",
        "groupID",
      ],
      include: [
        {
          model: db.Group,
          attributes: ["name", "description"],
          //   nest: true,
        },
      ],
      // order by name Z-A
      order: [["id", "DESC"]],
    });
    if (users) {
      //   let data = users.get({ plain: true });
      return {
        EC: 0,
        EM: "OK",
        DT: users,
      };
    } else {
      return {
        EC: 0,
        EM: "OK",
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EC: 1,
      EM: "Some thing went wrong",
      DT: "",
    };
  }
};

// const getUserWithPagination = async (page, limit) => {
//   try {
//     let offset = (page - 1) * limit;
//     const { count, rows } = await db.User.findAndCountAll({
//       attributes: ["id", "email", "username"],
//       include: [
//         {
//           model: db.Group,
//           attributes: ["name", "description"],
//           //   nest: true,
//         },
//       ],
//       offset: offset,
//       limit: limit,
//     });

//     let data = {
//       totalRows: count,
//       totalPages: Math.ceil(count / limit),
//       users: rows,
//     };
//     return {
//       EC: 0,
//       EM: "OK",
//       DT: data,
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       EC: 1,
//       EM: "Some thing went wrong",
//       DT: "",
//     };
//   }
// };

const createNewUser = async (data) => {
  try {
    // check email exist
    let isEmailExist = await checkEmail(data.email);
    if (isEmailExist === true) {
      return {
        EM: "Email is already exist",
        EC: 1,
        DT: [],
      };
    }

    //hash password
    let hashPass = hashPassword(data.password);

    await db.User.create({ ...data, password: hashPass });
    return {
      EC: 0,
      EM: "Create new user successfully",
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return { EC: 1, EM: "Some thing went wrong", DT: [] };
  }
};

const updateUser = async (data) => {
  try {
    if (!data.groupID) {
      return {
        EC: 1,
        EM: "GroupID not empty",
        DT: "groupID not empty",
      };
    }
    let user = await db.User.findOne({
      where: {
        id: data.id,
      },
    });
    if (user) {
      // update
      await user.update({
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: data.password,
        address: data.address,
        groupID: data.groupID,
        sex: data.sex,
      });
      return {
        EC: 0,
        EM: "Update user successfully",
        DT: "",
      };
    } else {
      //not found
      return {
        EC: 0,
        EM: "user not exist",
        DT: "",
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

const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      await user.destroy();
      return {
        EC: 0,
        EM: "delete OK",
        DT: [],
      };
    } else {
      return {
        EC: 0,
        EM: "User not exist",
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

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  // getUserWithPagination,
};
