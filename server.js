import express from "express";
import dotenv from "dotenv";
import bootstrap from "./src/app.controller.js";
import connection from "./src/db/connection.js";
import permissionsInit from "./src/seeders/permission.seeder.js";
import * as Transporter from "./src/mails/transporter.mail.js";
import TemplateGenerate from "./src/mails/generateEmailTemplate.mail.js";
import RolesInit from "./src/seeders/role.seeder.js"
import User from "./src/db/models/users.model.js";
import adminInit from "./src/seeders/admin.seeder.js"

dotenv.config();


const app = express();
const port = process.env.PORT || 5000;
await connection();
await Transporter.RunEmailServer();
await bootstrap(app, express);
await permissionsInit();
await RolesInit()
await adminInit()



app.listen(port, function () {
  console.log(`App Is Running On ${process.env.APP_URL}:${process.env.PORT}`);
});
