import { NextFunction, Response } from "express";
import admin from "../config/firebase-config";
import { TRequest } from "./../types";

const verifyToken = async (
  req: TRequest,
  _res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization as string;

  if (!authorization) return next();

  const token = authorization.split(" ")[1];
  const decodedToken = await admin.auth().verifyIdToken(token);
  req.user = decodedToken;

  next();
};

export default verifyToken;
