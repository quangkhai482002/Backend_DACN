require("dotenv").config();
const configCors = (app) => {
  // Add headers before the routes are defined
  app.use(function (req, res, next) {
    // Website you wish toallow to connect
    res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);
    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-with, content-type"
    );
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    // Pass to next layer of middleware
    next();
  });
};

export default configCors;