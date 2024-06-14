import {
  Body,
  Controller,
  Get,
  Patch,
  Path,
  Queries,
  Route,
  SuccessResponse
} from "tsoa";
import {
  getAllUser,
  getAllUserFromLeaderBoard,
  getOneUser,
  updateUser
} from "./service";
import {
  UserListResponse,
  UserPatchBody,
  UserQuery,
  UserResponse
} from "./types";
import { NotFoundError } from "../../../error/not-found";

@Route("users")
export default class UsersController extends Controller {
  @Get("/leaderboard")
  @SuccessResponse("200", "Success")
  public async indexAllUserFromLeaderboard(
    @Queries() query: UserQuery
  ): Promise<UserListResponse> {
    const result = await getAllUserFromLeaderBoard(query);
    this.setStatus(200);
    return {
      message: "success",
      ...result
    };
  }

  @Get("/")
  @SuccessResponse("200", "Success")
  public async indexAllUser(): Promise<UserListResponse> {
    const result = await getAllUser();
    this.setStatus(200);
    return {
      message: "success",
      data: result,
      pagination: {}
    };
  }

  @Get("{uid}")
  public async indexOneUser(@Path("uid") uid: string): Promise<UserResponse> {
    const result = await getOneUser(uid);
    if (!result) {
      throw new NotFoundError(`No User found with ID ${uid}`);
    }
    this.setStatus(200);
    return { message: "success", data: result };
  }

  @Patch("{uid}")
  public async patchOneUser(
    @Path("uid") uid: string,
    @Body() body: UserPatchBody
  ): Promise<UserResponse> {
    const result = await updateUser(uid, body);
    if (!result) {
      throw new NotFoundError(`No User found with ID ${uid}`);
    }
    this.setStatus(200);
    return { message: "success", data: result };
  }
}
