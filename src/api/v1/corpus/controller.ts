import { CustomError } from "@/types";
import {
  getAllCorpus,
  createCorpus,
  getOneCorpus,
  deleteOneCorpus,
  // updateOneCorpus,
} from "./service";
import { NextFunction, Request, Response } from "express";

export const indexAllCorpus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getAllCorpus(req);

    res.status(200).json({ data: result, pagination: {} });
  } catch (error) {
    next(error);
  }
};

export const indexOneCorpus = async (req: Request, res: Response) => {
  try {
    const { result, status } = await getOneCorpus(req);
    res.status(status).json({ data: result });
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "status" in error &&
      "message" in error
    ) {
      const { message, status } = error as CustomError;
      res.status(status).json({ status, error: message });
    } else {
      res.status(500).json({ status: 500, error: "Unknown error occurred" });
    }
  }
};

export const postCorpus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await createCorpus(req);
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
};

export const deleteCorpus = async (req: Request, res: Response) => {
  try {
    const result = await deleteOneCorpus(req);
    res.status(result.status).json(result);
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "status" in error &&
      "message" in error
    ) {
      const { message, status } = error as CustomError;
      res.status(status).json({ status, error: message });
    } else {
      res.status(500).json({ status: 500, error: "Unknown error occurred" });
    }
  }
};

// export const putCorpus = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) => {
// 	try {
// 		const { message, status } = await updateOneCorpus(req);
// 		res.status(status).json({ message });
// 	} catch (error: any) {
// 		if (error && typeof error === 'object' && 'status' in error) {
// 			const { message, status } = error;
// 			res.status(status).json({ status, error: message });
// 		} else {
// 			res.status(500).json({ status: 500, error: 'Unknown error occurred' });
// 		}
// 	}
// };
