import axios, { isAxiosError } from "axios";
import responses from "../utils/responseHelpers.js";
import { da } from "@faker-js/faker";

const globalErrorHandler = async (err, req, res, next) => {
  let errors = {};

  console.log(err)

  if (err.name === "ValidationError") {
    if (err.errors) {
      for (const element of Object.values(err.errors)) {
        errors[element.path] = element.message;
      }
    }

    if (err.details) {
      for (const element of Object.values(err.details)) {
        errors[element.context.label] = element.message;
      }
    }

    return res.status(422).json({ success: false, message: "failed validations", errors });
  }
  if (isAxiosError(err)) {
    
    if (err.response) {
      const { status, data } = err.response;
      const errors = data?.errors || null;
      const message = data?.message || err.message || "External API Error";

      if (status === 404) {
        res.status(404).json({ success: false, message: "page not found" });
      }
      return res.status(status).json({ success: false, message, errors });
    } else if (err.request) {
      return res.status(503).json({
        success: false,
        message: "No response received from external service (Network Error or Timeout).",
      });
    } else {
      return res
        .status(500)
        .json({ success: false, message: `Failed to setup request: ${err.message}` });
    }
  }
  return res
    .status(500)
    .json({ success: false, message: err.message || undefined, errors: err.errors });
};

export default globalErrorHandler;
