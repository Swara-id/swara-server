import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Route,
  SuccessResponse
} from "tsoa";
import {
  getAllChallenge,
  createChallenge,
  getOneChallenge,
  deleteOneChallenge,
  updateOneChallenge
} from "./service";
import { ListResponse, TResponse } from "@/types";
import { Challenge } from "@models/Challenge";

@Route("challenge")
export default class ChallengeController extends Controller {
  @Get("/")
  @SuccessResponse("200", "Success")
  public async indexAllChallenge(): Promise<ListResponse<Partial<Challenge>>> {
    try {
      const result = await getAllChallenge();
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

  @Get("{id}")
  public async indexOneChallenge(
    @Path("id") id: number | string
  ): Promise<TResponse<Partial<Challenge>>> {
    try {
      const result = await getOneChallenge(id);
      if (!result) {
        this.setStatus(404);
        return { message: `No Challenge found with ID ${id}` };
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

  @Post()
  public async postChallenge(
    @Body() body: Challenge
  ): Promise<TResponse<Partial<Challenge>>> {
    try {
      const result = await createChallenge(body);
      this.setStatus(201);
      return { message: "create challenge success", data: result };
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? (error.message as string)
          : "An error occurred while creating Challenge";
      const status =
        error && typeof error === "object" && "status" in error
          ? (error.status as number)
          : 500;
      this.setStatus(status);
      return { message };
    }
  }

  @Patch("{id}")
  public async patchChallenge(
    @Path("id") id: number | string,
    @Body() body: Challenge
  ): Promise<TResponse<Partial<Challenge>>> {
    try {
      const result = await updateOneChallenge(id, body);
      this.setStatus(201);
      return { message: `Update challenge ${result.id} success`, data: result };
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? (error.message as string)
          : "An error occurred while updating Challenge";
      const status =
        error && typeof error === "object" && "status" in error
          ? (error.status as number)
          : 500;
      this.setStatus(status);
      return { message };
    }
  }

  @Delete("{id}")
  public async deleteChallenge(
    @Path("id") id: number | string
  ): Promise<TResponse<Partial<Challenge>>> {
    try {
      const result = await deleteOneChallenge(id);
      this.setStatus(200);
      return { message: `Delete challenge ${result.id} success`, data: result };
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? (error.message as string)
          : "An error occurred while deleting Challenge";
      const status =
        error && typeof error === "object" && "status" in error
          ? (error.status as number)
          : 500;
      this.setStatus(status);
      return { message };
    }
  }
}
