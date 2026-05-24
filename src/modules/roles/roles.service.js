import Roles from "../../db/models/roles.model.js";
import Permissions from '../../db/models/permission.model.js'
import {trimmingAndConvertToArray} from "../../utils/stringHelpers.js"

export const index = async (req, res, next) => {
  const roles = await Roles.searchFindRole(req.query);
  return res.json({ success: true, message: "Roles Retrived", data: roles });
};

export const show = async (req, res, next) => {
  const { id } = req.params;
  const {include} = req?.query
  const includes = trimmingAndConvertToArray(include ?? "");
  console.log(includes);
  const role = await Roles.findById(id);
  if (!role) return res.status(404).json({ success: false, message: "no role found" });
  return res.json({ success: true, message: "Role Retrived", data: role });
};

export const store = async (req, res, next) => {
  const { name, description } = req.body;
  const addNewRole = await Roles.create({ name, description });
  return res.status(201).json({ success: true, message: "Role created" });
};

export const update = async (req, res, next) => {
  const { id } = req.params;
  const role = await Roles.findByIdAndUpdate(
    id,
    { ...req.body },
    { returnDocument: "after", runValidators: true },
  );
  if (!role) return res.status(404).json({ success: false, message: "no role found" });
  return res.json({ success: true, message: "Role Updated", data: role });
};

export const destroy = async (req, res, next) => {
  const { id } = req.params;
  const role = await Roles.findByIdAndDelete(id);
  if (!role) return res.status(404).json({ success: false, message: "no role found" });
  return res.json({ success: true, message: "Role deleted" });
};

export const assignPermissionsToRole = async(req, res, next) => {
  const { id } = req.params;
  const {permissions} = req.body
  const role = await Roles.findById(id);
  if (!role) return res.status(404).json({ success: false, message: "no role found" });
  role.permissions = permissions;
  await role.save()
  return res.json({ success: true, message: "permissions assigned" });
};


