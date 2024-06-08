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
  getAllNewsTypes,
  createNewsType,
  getOneNewsType,
  deleteOneNewsType,
  updateOneNewsType
} from "./service";
import { ListResponse, TResponse } from "../../../types";
import { NewsType, NewNewsType, NewsTypeUpdate } from "../../../models/NewsType";

@Route("news-types")
export default class NewsTypeController extends Controller {
  @Get("/")
  @SuccessResponse("200", "Success")
  public async indexAllNewsTypes(): Promise<ListResponse<NewsType>> {
    try {
      const result = await getAllNewsTypes();
      if (!result || (Array.isArray(result) && result.length === 0)) {
        this.setStatus(404);
        throw { message: "No news types found", status: 404 };
      }
      this.setStatus(200);
      return { message: "success", data: result, pagination: {} };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An error occurred while fetching news types";
      this.setStatus(500);
      return { message, data: [], pagination: {} };
    }
  }

  @Get("{id}")
  @SuccessResponse("200", "Success")
  public async indexOneNewsType(
    @Path("id") id: number | string
  ): Promise<TResponse<NewsType>> {
    try {
      const result = await getOneNewsType(id);
      if (!result) {
        this.setStatus(404);
        return { message: `No news type found with ID ${id}` };
      }
      this.setStatus(200);
      return { message: "success", data: result };
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? (error.message as string)
          : "An error occurred while fetching news type";
      const status =
        error && typeof error === "object" && "status" in error
          ? (error.status as number)
          : 500;
      this.setStatus(status);
      return { message };
    }
  }

  @Post()
  @SuccessResponse("201", "Created")
  public async postNewsType(
    @Body() body: NewNewsType
  ): Promise<TResponse<NewsType>> {
    try {
      const result = await createNewsType(body);
      this.setStatus(201);
      return { message: "create news type success", data: result };
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? (error.message as string)
          : "An error occurred while creating news type";
      const status =
        error && typeof error === "object" && "status" in error
          ? (error.status as number)
          : 500;
      this.setStatus(status);
      return { message };
    }
  }

  @Patch("{id}")
  @SuccessResponse("200", "Updated")
  public async patchNewsType(
    @Path("id") id: number | string,
    @Body() body: NewsTypeUpdate
  ): Promise<TResponse<NewsType>> {
    try {
      const result = await updateOneNewsType(id, body);
      this.setStatus(200);
      return { message: `Update news type ${result.id} success`, data: result };
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? (error.message as string)
          : "An error occurred while updating news type";
      const status =
        error && typeof error === "object" && "status" in error
          ? (error.status as number)
          : 500;
      this.setStatus(status);
      return { message };
    }
  }

  @Delete("{id}")
  @SuccessResponse("200", "Deleted")
  public async deleteNewsType(
    @Path("id") id: number | string
  ): Promise<TResponse<NewsType>> {
    try {
      const result = await deleteOneNewsType(id);
      this.setStatus(200);
      return { message: `Delete news type ${result.id} success`, data: result };
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? (error.message as string)
          : "An error occurred while deleting news type";
      const status =
        error && typeof error === "object" && "status" in error
          ? (error.status as number)
          : 500;
      this.setStatus(status);
      return { message };
    }
  }
}
