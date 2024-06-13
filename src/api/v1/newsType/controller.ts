import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Route,
  Security,
  SuccessResponse
} from "tsoa";
import {
  getAllNewsTypes,
  createNewsType,
  getOneNewsType,
  deleteOneNewsType,
  updateOneNewsType
} from "./service";
import { NewsTypeBody, NewsTypeListResponse, NewsTypeResponse } from "./types";

@Route("news-type")
export default class NewsTypeController extends Controller {
  @Get("/")
  @SuccessResponse("200", "Success")
  public async indexAllNewsTypes(): Promise<NewsTypeListResponse> {
    const result = await getAllNewsTypes();
    this.setStatus(200);
    return { message: "success", data: result, pagination: {} };
  }

  @Get("{id}")
  @SuccessResponse("200", "Success")
  public async indexOneNewsType(
    @Path("id") id: number | string
  ): Promise<NewsTypeResponse> {
    const result = await getOneNewsType(id);

    this.setStatus(200);
    return { message: "success", data: result };
  }

  @Post()
  @Security("access_token")
  @SuccessResponse("201", "Created")
  public async postNewsType(
    @Body() body: NewsTypeBody
  ): Promise<NewsTypeResponse> {
    const result = await createNewsType(body);
    this.setStatus(201);
    return { message: "create news type success", data: result };
  }

  @Patch("{id}")
  @SuccessResponse("200", "Updated")
  public async patchNewsType(
    @Path("id") id: number | string,
    @Body() body: Partial<NewsTypeBody>
  ): Promise<NewsTypeResponse> {
    const result = await updateOneNewsType(id, body);
    this.setStatus(200);
    return { message: `Update news type ${result.id} success`, data: result };
  }

  @Delete("{id}")
  @SuccessResponse("200", "Deleted")
  public async deleteNewsType(
    @Path("id") id: number | string
  ): Promise<NewsTypeResponse> {
    const result = await deleteOneNewsType(id);
    this.setStatus(200);
    return { message: `Delete news type ${result.id} success`, data: result };
  }
}
