import { getAllUser } from './service';
import { NextFunction, Request, Response } from "express";


export const indexAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getAllUser(req);

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};