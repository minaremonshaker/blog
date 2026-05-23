export const index = async (req, res, next) => {
    return res.json({sucess: true , message: ""})
};
export const show = async (req, res, next) => {
     return res.json({ sucess: true, message: "" });
};
export const store = async (req, res, next) => {
     return res.status(201).json({ sucess: true, message: "" });
};
export const update = async (req, res, next) => {
     return res.json({ sucess: true, message: "" });
};
export const destroy = async (req, res, next) => {
     return res.json({ sucess: true, message: "" });
};