import { Request, Response } from "express";
import { HttpError } from "http-errors";
import { config } from "../config/config";

const globalErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
) => {
  const error = err as HttpError; // Explicitly cast to HttpError
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    message: error.message || "Internal Server Error",
    errorStack: config.env === "development" ? error.stack : "",
  });
};

export default globalErrorHandler;