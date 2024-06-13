import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "../constant/httpStatus";
import { CustomAPIError } from "../error/custom-api-error";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let customError = {
    message: "Something went wrong",
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR
  };

  if (err instanceof CustomAPIError) {
    customError = {
      message: err.message,
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    };
  }

  return res
    .status(customError.statusCode)
    .json({ message: customError.message, error: err.stack?.split("\n")[0] });
};
