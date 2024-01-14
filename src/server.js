import express from "express";
import configViewEngine from "./config/viewEngine";
import initApiRoutes from "./routes/api";
import initWebRoutes from "./routes/web";
import configCors from "./config/cors";
import bodyParser from "body-parser";
import connection from "./config/connectDB";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

//config cors
configCors(app);

//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connect to db
connection();

//init web routes
initWebRoutes(app);
//init api routes
initApiRoutes(app);

app.listen(PORT, () => {
  console.log("BE running on port = " + PORT);
});
