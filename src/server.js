require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initApiRoutes from "./routes/api";
import initWebRoutes from "./routes/web";
import configCors from "./config/cors";
import bodyParser from "body-parser";
import connection from "./config/connectDB";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 4000;

//config cors
configCors(app);

//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config cookie-parser
app.use(cookieParser());

//test connect to db
connection();

//init web routes
initWebRoutes(app);
//init api routes
initApiRoutes(app);

app.use((req, res) => {
  res.send("404 not found");
});

app.listen(PORT, () => {
  console.log("BE running on port = " + PORT);
});
