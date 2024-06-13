import {
  Body,
  Controller,
  Delete,
  FormField,
  Get,
  Patch,
  Path,
  Post,
  Queries,
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
import { NewsBody, NewsListResponse, NewsQuery, NewsResponse } from "./types";

@Route("news")
export default class NewsController extends Controller {
  @Get("/")
  @SuccessResponse("200", "Success")
  public async indexAllNews(
    @Queries() query: NewsQuery
  ): Promise<NewsListResponse> {
    const result = await getAllNews(query);
    this.setStatus(200);
    return {
      message: "success",
      ...result
    };
  }

  @Get("{id}")
  @SuccessResponse("200", "Success")
  public async indexOneNews(
    @Path("id") id: number | string
  ): Promise<NewsResponse> {
    const result = await getOneNews(id);
    this.setStatus(200);
    return { message: "success", data: result };
  }

  @Post()
  @SuccessResponse("201", "Created")
  public async postNews(
    @FormField() title: string,
    @FormField() description: string,
    @FormField() newsTypeId: number,
    @FormField() dateOfEvent: Date,

    @UploadedFile("file") file?: Express.Multer.File
  ): Promise<NewsResponse> {
    try {
      const result = await createNews(
        { title, description, newsTypeId, dateOfEvent },
        file
      );
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

  @Patch("{id}")
  @SuccessResponse("200", "Updated")
  public async patchNews(
    @Path("id") id: number | string,
    @Body() body: Partial<NewsBody>
  ): Promise<NewsResponse> {
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
  ): Promise<NewsResponse> {
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
