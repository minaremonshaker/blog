import mongoose from "mongoose";
import rulesSchema from "../Schemas/roles.schema.js";

const searchableFeilds = ["name", "description"];

rulesSchema.statics.searchFindRole = async function (query) {
  const queryObject = {};
  const sort = query.sort ? query.sort.replaceAll(",", " ").trim() : "id";
  const project = query.project ? query.project.replaceAll(",", " ").trim() : "";
  const page = query.page ? parseInt(query.page) : null;
  const limit = query.limit && query.page ? parseInt(query.limit) : null;
  const totalPages = Math.ceil((await this.countDocuments({})) / limit);
  const prevPage = page - 1 === 0 ? null : page - 1;
  const nextPage = page + 1 > totalPages ? null : page + 1;
  const offset = (page - 1) * limit;

  if (query.term)
    queryObject.$or = searchableFeilds.map((feild) => {
      return { [feild]: { $regex: new RegExp(`^${query.term}`), $options: "i" } };
    });

  const user = await this.find(queryObject)
    .sort(sort)
    .select(project)
    .populate(project)
    .limit(limit)
    .skip(offset);

  return {
    count: user.length,
    totalPages: totalPages,
    prev: prevPage,
    curr: page,
    next: nextPage,
    limit: limit,
    offset: offset,
    users: user,
  };
};

const Roles = mongoose.model("roles", rulesSchema);

export default Roles;
