import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Route,
  SuccessResponse,
  UploadedFile
} from "tsoa";
import {
  getAllNews,
  createNews,
  getOneNews,
  deleteOneNews,
  updateOneNews
} from "./service";
import { ListResponse, TResponse } from "@/types";
import { News } from "@models/News";

@Route("news")
export default class NewsController extends Controller {
  @Get("/")
  @SuccessResponse("200", "Success")
  public async indexAllNews(): Promise<ListResponse<Partial<News>>> {
    try {
      const result = await getAllNews();
      if (!result || (Array.isArray(result) && result.length === 0)) {
        this.setStatus(404);
        throw { message: "No News found", status: 404 };
      }
      this.setStatus(200);
      return { message: "success", data: result, pagination: {} };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An error occurred while fetching News";
      this.setStatus(500);
      return { message, data: [], pagination: {} };
    }
  }

  @Get("{id}")
  public async indexOneNews(
    @Path("id") id: number | string
  ): Promise<TResponse<Partial<News>>> {
    try {
      const result = await getOneNews(id);
      if (!result) {
        this.setStatus(404);
        return { message: `No News found with ID ${id}` };
      }
      this.setStatus(200);
      return { message: "success", data: result };
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? (error.message as string)
          : "An error occurred while fetching News";
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
  public async postNews(
    @Body() body: News,
    @UploadedFile("file") file?: Express.Multer.File
  ): Promise<TResponse<Partial<News>>> {
    try {
      const result = await createNews(body, file);
      this.setStatus(201);
      return { message: "create news success", data: result };
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? (error.message as string)
          : "An error occurred while creating News";
      const status =
        error && typeof error === "object" && "status" in error
          ? (error.status as number)
          : 500;
      this.setStatus(status);
      return { message };
    }
  }

  @Put("{id}")
  @SuccessResponse("200", "Updated")
  public async putNews(
    @Path("id") id: number | string,
    @Body() body: News
  ): Promise<TResponse<Partial<News>>> {
    try {
      const result = await updateOneNews(id, body);
      this.setStatus(200);
      return { message: `Update news ${result.id} success`, data: result };
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? (error.message as string)
          : "An error occurred while updating News";
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
  public async deleteNews(
    @Path("id") id: number | string
  ): Promise<TResponse<Partial<News>>> {
    try {
      const result = await deleteOneNews(id);
      this.setStatus(200);
      return { message: `Delete news ${result.id} success`, data: result };
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? (error.message as string)
          : "An error occurred while deleting News";
      const status =
        error && typeof error === "object" && "status" in error
          ? (error.status as number)
          : 500;
      this.setStatus(status);
      return { message };
    }
  }
}
