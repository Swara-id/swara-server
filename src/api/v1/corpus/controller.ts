import { getAllCorpus } from './service';
import { NewCorpus } from "../../../models/corpus";
import { db } from "../../../database";
import { NextFunction, Request, Response } from "express";

export const indexAllCorpus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getAllCorpus(req);

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};