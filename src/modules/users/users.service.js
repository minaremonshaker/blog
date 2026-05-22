import User from "../../db/models/users.model.js";
import Address from "../../db/models/addresses.model.js";
import * as optHelpers from '../../utils/otpHelpers.js';

export const index = async (req, res, next) => {
  const users = await User.smartPaginate(req.query);
  return res.json({
    success: true,
    message: users.docs.length === 0 ? "No users found" : "Users retrieved successfully",
    count: users.totalDocs,
    totalPages: users.totalPages, // Removed the redundant 'pageCount'
    prev: users.prevPage,
    curr: users.page,
    next: users.nextPage,
    limit: users.limit,
    offset: users.offset,
    users: users.docs,
  });
};

export const show = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("addresses");
  if (!user) return res.status(404).json({ success: false, message: "user not found" });
  await optHelpers.generateOtp(user.email,'registration');
  return res.json({
    success: true,
    message: "user retrivied succefully",
    data: user,
  });
};

export const store = async (req, res, next) => {
  const {
    first_name,
    last_name,
    email,
    username,
    password,
    apartement_number,
    street,
    city,
    state,
    country,
  } = req?.body || {};

  const createUser = await User.create({
    first_name,
    last_name,
    username,
    email,
    password,
  });
  const createAddress = await Address.create({
    user_id: req.user_id ?? createUser.id,
    apartement_number,
    street,
    city,
    state,
    country,
  });
  return res.status(201).json({
    success: true,
    message: "user created succefully",
  });
};

export const replace = async (req, res, next) => {
  const { id } = req.params;
  const updatedUser = await User.findOneAndReplace({ _id: id }, req.body, {
    returnDocument: "after",
  });
  if (!updatedUser) return res.status(404).json({ success: false, message: "user not found" });

  return res.json({ success: true, message: "user replaced succefully", data: updatedUser });
};

export const update = async (req, res, next) => {
  const { id } = req.params;

  const updatedUser = await User.findOneAndUpdate({ _id: id }, req.body, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!updatedUser) return res.status(404).json({ success: false, message: "user not found" });

  return res.json({ success: true, message: "user updated succefully", data: updatedUser });
};

export const destroy = async (req, res, next) => {
  const { id } = req.params;
  const deletedUser = await User.findOneAndDelete({ _id: id });
  if (!deletedUser) return res.status(404).json({ success: false, message: "user not found" });

  return res.json({ success: true, message: "user deleted succefully" });
};
