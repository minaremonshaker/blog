import express from "express";
import dotenv from "dotenv";
import bootstrap from "./src/app.controller.js";
import connection from "./src/db/connection.js";
import userSeed from "./src/seeders/user.seeder.js";
import permissionSeed from "./src/seeders/permission.seeder.js";
import * as Transporter from "./src/mails/transporter.mail.js";
import TemplateGenerate from "./src/mails/generateEmailTemplate.mail.js";
import roleSeed from "./src/seeders/role.seeder.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
await connection();
await Transporter.RunEmailServer();
await bootstrap(app, express);

//await userSeed(10)
await permissionSeed();
//await roleSeed()

app.listen(port, function () {
  console.log(`App Is Running On ${process.env.APP_URL}:${process.env.PORT}`);
});
