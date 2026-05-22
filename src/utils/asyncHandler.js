import mongoose from "mongoose";

export const requestsAsyncHandler = (callback) => {
  return async(req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (err) {
    
      next(err);
    }
  };
};




export const asyncHandler = (callback) => {
    return async(...arg) => {
        try{
            return await callback(...arg)
        }catch(err) {
            console.log(err.message)
        }
    }
}