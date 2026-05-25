import Roles from "../../db/models/roles.model.js";


export const assign = async (req, res, next) => {
  const { id } = req.params;
  const { permissions } = req.body;
  const role = await Roles.findOne({_id:id})
  if(!role) return res.status(404).json({success: false, message: "user not found"});
  role.permissions.addToSet(...permissions);
  await role.save()
  return res.status(201).json({ success: true, message: "permissions got assigned to role " });
};

export const revoke = (req, res, next) => {
  return res.status(201).json({ success: true, message: "permissions got revoked from role " });
};
