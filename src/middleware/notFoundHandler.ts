import { Request, Response } from "express";
import { StatusCodes } from "../constant/httpStatus";

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    message: `Not Found - ${req.originalUrl}`
  });
};
