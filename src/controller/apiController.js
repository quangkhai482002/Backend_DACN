import loginRegisterService from "../service/loginRegisterService";

const handleRegister = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(200).json({
        EM: "Missing require parameters", // EM: error message
        EC: "1", // EC: error code
        DT: "", // DT: date
      });
    }

    if (req.body.password && req.body.password.length < 4) {
      return res.status(200).json({
        EM: "Password must be at least 4 characters", // EM: error message
        EC: "1", // EC: error code
        DT: "", // DT: date
      });
    }

    // service : create user
    let data = await loginRegisterService.registerNewUser(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (err) {
    return res.status(500).json({
      EM: "error", // EM: error message
      EC: "-1", // EC: error code
      DT: "", // DT: data
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    let data = await loginRegisterService.handleUserLogin(req.body);
    //set cookie
    if (data && data.DT && data.DT.access_token) {
      res.cookie("jwt", data.DT.access_token, {
        httpOnly: true,
        maxAge: 3600000, // 30s
      });
    }

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({
      EM: "error from server", // EM: error message
      EC: "-1", // EC: error code
      DT: "", // DT: data
    });
  }
};
module.exports = {
  handleRegister,
  handleLogin,
};
