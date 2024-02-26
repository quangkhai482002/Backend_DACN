import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import bluebird from "bluebird";
import db from "../models/index.js";

// create the connection, specify bluebird as Promise

const salt = bcrypt.genSaltSync(10);
const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  let hashPass = hashPassword(password);
  //C1 -------- use mysql2 --------
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });
  // connection.query(
  //   "INSERT INTO `user` (`email`, `password`, `username`) VALUES (?, ?, ?)",
  //   [email, hashPass, username],
  //   function (err, results, fields) {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(results); // results contains rows returned by server
  //     // console.log(fields); // fields contains extra meta data about results, if available
  //   }
  // );
  //--------------------------------------------------------------------------------------------

  try {
    //C2 -------- use mysql2 --------
    // const [rows, fields] = await connection.execute(
    //   "INSERT INTO user (email, password, username) VALUES (?, ?, ?)",
    //   [email, hashPass, username]
    // );
    // return rows;
    //--------------------------------------------------------------------------------------------

    //C3 -------- use sequelize --------
    await db.User.create({
      email: email,
      password: hashPass,
      username: username,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserList = async () => {
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  // let user = [];
  //C1 -------- use mysql2 --------
  // await connection.query(
  //   "SELECT * FROM `user` ",
  //   function (err, results, fields) {
  //     if (err) {
  //       console.log(err);
  //       return user;
  //     }
  //     user = results;
  //     console.log("check user: ", user);
  //     return user;

  //     // console.log("check results: ", results); // results contains rows returned by server
  //     // console.log(fields); // fields contains extra meta data about results, if available
  //   }
  // );
  //--------------------------------------------------------------------------------------------

  try {
    //C2 -------- use mysql2 --------
    // const [rows, fields] = await connection.execute("SELECT * FROM `user`");
    // return rows;
    //--------------------------------------------------------------------------------------------

    //C3 -------- use sequelize --------
    // let userList = await db.User.findAll();
    let newUser = await db.User.findOne({
      where: {
        id: 1,
      },
      attributes: ["id", "email", "username"], // chỉ lấy những trường này
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      raw: true,
      nest: true, // dùng để lấy dữ liệu của các bảng liên kết thành 1 object
    });
    // console.log("check newUser:", newUser);

    // let roles = await db.Group.findAll({
    //   where: {
    //     id: 1,
    //   },
    //   include: {
    //     model: db.Role,
    //   },
    //   raw: true,
    //   nest: true, // dùng để lấy dữ liệu của các bảng liên kết thành 1 object
    // });

    // let roles = await db.Role.findAll({
    //   include: {
    //     model: db.Group,
    //     where: {
    //       id: 1,
    //     },
    //   },
    //   raw: true,
    //   nest: true, // dùng để lấy dữ liệu của các bảng liên kết thành 1 object
    // });

    // console.log("check roles:", roles);

    let userList = [];
    userList = await db.User.findAll();
    return userList;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (userId) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    //C1 -------- use mysql2 --------
    // const [rows, fields] = await connection.execute(
    //   "DELETE FROM user WHERE id = ?",
    //   [userId]
    // );
    // return rows;
    //--------------------------------------------------------------------------------------------

    //C2 -------- use sequelize --------
    await db.User.destroy({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (id) => {
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });
  try {
    //C1 -------- use mysql2 --------
    // const [rows, fields] = await connection.execute(
    //   "SELECT * FROM user WHERE id = ?",
    //   [id]
    // );
    // return rows;
    //--------------------------------------------------------------------------------------------

    //C2 -------- use sequelize --------
    let user = {};
    user = await db.User.findOne({
      where: {
        id: id,
      },
    });
    // return user;

    // Để trả về dữ liệu thuần khi dùng sequelize
    return user.get({ plain: true });
  } catch (error) {
    console.log(error);
  }
};
const updateUserData = async (email, password, username, id) => {
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });
  let hashPass = hashPassword(password);

  try {
    //C1 -------- use mysql2 --------
    // const [rows, fields] = await connection.execute(
    //   "UPDATE user SET email = ?, password = ?, username = ? WHERE id = ?",
    //   [email, password, username, id]
    // );
    // return rows;
    //--------------------------------------------------------------------------------------------

    //C2 -------- use sequelize --------
    await db.User.update(
      {
        email: email,
        password: hashPass,
        username: username,
      },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserData,
};
