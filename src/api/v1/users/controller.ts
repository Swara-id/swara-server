import { Controller, Get, Path, Route, SuccessResponse } from "tsoa";
import { ListResponse, TResponse } from "../../../types";
import {
  // createUser,
  // deleteOneUser,
  getAllUser,
  getOneUser,
  updateOneUser
} from "./service";
import { NextFunction, Request, Response } from "express";
import { UserResult } from "./types";

@Route("users")
export default class UsersController extends Controller {
  @Get("/")
  @SuccessResponse("200", "Success")
  public async indexAllUser(): Promise<ListResponse<Partial<UserResult>>> {
    try {
      const result = await getAllUser();
      if (!result || (Array.isArray(result) && result.length === 0)) {
        this.setStatus(404);
        throw { message: "No Challenge found", status: 404 };
      }
      this.setStatus(200);
      return {
        message: "success",
        data: result,
        pagination: {}
      };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An error occurred while fetching Challenge";
      this.setStatus(500);
      return {
        message,
        data: [],
        pagination: {}
      };
    }
  }

  @Get("{uid}")
  public async indexOneUser(
    @Path("uid") uid: string
  ): Promise<TResponse<Partial<UserResult>>> {
    try {
      const result = await getOneUser(uid);
      if (!result) {
        this.setStatus(404);
        return { message: `No Challenge found with ID ${uid}` };
      }
      this.setStatus(200);
      return { message: "success", data: result };
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? (error.message as string)
          : "An error occurred while fetching Challenge";
      const status =
        error && typeof error === "object" && "status" in error
          ? (error.status as number)
          : 500;
      this.setStatus(status);
      return { message };
    }
  }
}

export const putUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await updateOneUser(req);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
