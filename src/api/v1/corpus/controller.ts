import {
  Controller,
  Delete,
  FormField,
  Get,
  Path,
  Post,
  Route,
  SuccessResponse,
  UploadedFiles
} from "tsoa";
import {
  getAllCorpus,
  createCorpus,
  getOneCorpus,
  deleteOneCorpus
} from "./service";
import { CorpusResult, CorpusGet } from "./types";
import { ListResponse, TResponse } from "../../../types";

@Route("corpus")
export default class CorpusController extends Controller {
  @Get("/")
  @SuccessResponse("200", "Success")
  public async indexAllCorpus(): Promise<ListResponse<Partial<CorpusResult>>> {
    try {
      const result = await getAllCorpus();
      if (!result || (Array.isArray(result) && result.length === 0)) {
        throw { message: "No Corpus found", status: 404 };
      }
      this.setStatus(200);
      return {
        message: "success",
        data: result,
        pagination: {}
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

  @Get("{id}")
  public async indexOneCorpus(
    @Path("id") id: number | string
  ): Promise<TResponse<Partial<CorpusGet>>> {
    try {
      const { result, status } = await getOneCorpus(id);
      if (!result) {
        this.setStatus(404);
        return { message: `No Corpus found with ID ${id}` };
      }
      this.setStatus(status);
      return { message: "success", data: result };
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
      return { message };
    }
  }

  @Post()
  public async postCorpus(
    @FormField() type: "word" | "letter",
    @FormField() value: string,
    @UploadedFiles() file?: Express.Multer.File[]
  ): Promise<TResponse<Partial<CorpusGet>>> {
    const body = { type, value };
    try {
      if (!file || file.length === 0) {
        this.setStatus(400);
        throw { message: "No file uploaded" };
      }
      const result = await createCorpus(body, file);
      this.setStatus(201);
      return { message: "Create corpus success", data: result };
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? (error.message as string)
          : "An error occurred while creating Corpus";
      const status =
        error && typeof error === "object" && "status" in error
          ? (error.status as number)
          : 500;
      this.setStatus(status);
      return { message };
    }
  }

  @Delete("{id}")
  public async deleteCorpus(
    @Path("id") id: number | string
  ): Promise<TResponse> {
    try {
      const { message } = await deleteOneCorpus(id);
      this.setStatus(200);

      return {
        message
      };
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? (error.message as string)
          : "An error occurred while deleting Corpus";
      const status =
        error && typeof error === "object" && "status" in error
          ? (error.status as number)
          : 500;
      this.setStatus(status);
      return { message };
    }
  }
}
