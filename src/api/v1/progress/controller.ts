import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Route,
  Security,
  SuccessResponse
} from "tsoa";
import { createProgress, getUserProgress } from "./service";
import { ProgressBody, ProgressListResponse, ProgressResponse } from "./types";

@Route("progress")
@Security("access_token")
export default class ProgressController extends Controller {
  @Get("/")
  @SuccessResponse("200", "Success")
  public async indexUserProgress(
    @Request() uid: string
  ): Promise<ProgressListResponse> {
    try {
      const { results, count } = await getUserProgress(uid);
      if (!results || (Array.isArray(results) && results.length === 0)) {
        this.setStatus(404);
        return {
          message: "No Progress found",
          data: [],
          pagination: {}
        };
      }
      this.setStatus(200);
      return {
        message: "success",
        data: results,
        pagination: {
          total: count
        }
      };
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? (error.message as string)
          : "An error occurred while fetching Corpus";
      const status =
        error && typeof error === "object" && "status" in error
          ? (error.status as number)
          : 500;
      this.setStatus(status);
      return {
        message,
        data: [],
        pagination: {}
      };
    }
  }

  @Post()
  @Security("access_token")
  @SuccessResponse("201", "Created")
  public async postProgress(
    @Body() body: ProgressBody
  ): Promise<ProgressResponse> {
    try {
      const result = await createProgress(body);
      this.setStatus(201);
      return { message: "Create Progress success", data: result };
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? (error.message as string)
          : "An error occurred while creating Progress";
      const status =
        error && typeof error === "object" && "status" in error
          ? (error.status as number)
          : 500;
      this.setStatus(status);
      return { message };
    }
  }
}
