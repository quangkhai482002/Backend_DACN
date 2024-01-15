import db from "../models/index";

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "email", "username", "password"],
      include: [
        {
          model: db.Group,
          attributes: ["name", "description"],
          //   nest: true,
        },
      ],
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

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      attributes: ["id", "email", "username"],
      include: [
        {
          model: db.Group,
          attributes: ["name", "description"],
          //   nest: true,
        },
      ],
      offset: offset,
      limit: limit,
    });

    let data = {
      totalRows: count,
      totalPages: Math.ceil(count / limit),
      users: rows,
    };
    return {
      EC: 0,
      EM: "OK",
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EC: 1,
      EM: "Some thing went wrong",
      DT: "",
    };
  }
};

const createNewUser = async () => {
  try {
    await db.User.create({
      //   email: email,
      //   password: password,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (data) => {
  try {
    let user = await db.User.findOne({
      where: {
        id: data.id,
      },
    });
    if (user) {
      // update
      //   await
      user.save({});
    } else {
      //not found
    }
  } catch (error) {
    console.log(error);
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
  getUserWithPagination,
};
