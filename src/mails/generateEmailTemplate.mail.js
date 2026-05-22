import handlebars from "handlebars";
import fs from "fs/promises";
import path from "path";
import Handlebars from "handlebars";
import * as asyncHandlers from '../utils/asyncHandler.js'
import { da } from "@faker-js/faker";

const _mainAppPath = path.resolve(import.meta.dirname, "..");

const generateEmailTemplates = asyncHandlers.asyncHandler(async (template, data) => {
    const regex = new RegExp(/\w+\.(template)\.(html)/, "gi");
    if(!regex.test(template)) throw new Error('templates neeed to be html')
    const folderPath = path.join(_mainAppPath, "mails");
    const templateFolderName = template.substring(0, template.indexOf(".")).trim().toLowerCase();
    const openDirictory = await fs.opendir(path.join(folderPath, templateFolderName));
    const filesInDrictory = [];
    for await (const file of openDirictory)
      filesInDrictory.push({ name: file.name, path: file.parentPath });
    const matchedEmailTemplate = filesInDrictory.filter((temp) => temp.name === template)[0];
    const templatePath = path.join(matchedEmailTemplate.path, matchedEmailTemplate.name);
    const temp = await fs.readFile(templatePath, "utf-8");
    const compiledTemplate = Handlebars.compile(temp);
    return compiledTemplate(data);
});

export default generateEmailTemplates;
