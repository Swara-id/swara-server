import { getAllUserFromLeaderBoard } from "./../users/service";
import { Controller, Get, Queries, Route, SuccessResponse } from "tsoa";
import { ListResponse } from "../../../types";
import { UserQuery, UserResult } from "../users/types";

@Route("leaderboard")
export default class LeaderboardController extends Controller {
  @Get("/")
  @SuccessResponse("200", "Success")
  public async indexLeaderboard(
    @Queries() query: UserQuery
  ): Promise<ListResponse<Partial<UserResult>>> {
    const result = await getAllUserFromLeaderBoard(query);
    this.setStatus(200);
    return {
      message: "success",
      ...result
    };
  }
}
