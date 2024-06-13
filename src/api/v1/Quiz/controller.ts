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
import { getAllQuiz, createQuiz, getOneQuiz, deleteOneQuiz } from "./service";
import { ChoiceBody, QuizListResponse, QuizResponse } from "./types";

@Route("quiz")
export default class QuizController extends Controller {
  @Get("/")
  @SuccessResponse("200", "Success")
  public async indexAllQuiz(): Promise<QuizListResponse> {
    try {
      const result = await getAllQuiz();
      if (!result || (Array.isArray(result) && result.length === 0)) {
        throw { message: "No Quiz found", status: 404 };
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
          : "An error occurred while fetching Quiz";
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
  public async indexOneQuiz(
    @Path("id") id: number | string
  ): Promise<QuizResponse> {
    try {
      const result = await getOneQuiz(id);
      if (!result) {
        this.setStatus(404);
        return { message: `No Quiz found with ID ${id}` };
      }
      this.setStatus(200);
      return { message: "success", data: result };
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? (error.message as string)
          : "An error occurred while fetching Quiz";
      const status =
        error && typeof error === "object" && "status" in error
          ? (error.status as number)
          : 500;
      this.setStatus(status);
      return { message };
    }
  }

  @Post()
  public async postQuiz(
    @FormField() question: string,
    @FormField() choices: ChoiceBody[],
    @UploadedFiles() files?: Express.Multer.File[]
  ): Promise<QuizResponse> {
    try {
      if (!files || files.length === 0) {
        this.setStatus(400);
        throw { message: "No file uploaded" };
      }
      const result = await createQuiz({ question, choices }, files);
      this.setStatus(201);
      return { message: "Create Quiz success", data: result };
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? (error.message as string)
          : "An error occurred while creating Quiz";
      const status =
        error && typeof error === "object" && "status" in error
          ? (error.status as number)
          : 500;
      this.setStatus(status);
      return { message };
    }
  }

  @Delete("{id}")
  public async deleteQuiz(
    @Path("id") id: number | string
  ): Promise<QuizResponse> {
    try {
      const { message } = await deleteOneQuiz(id);
      this.setStatus(200);

      return {
        message
      };
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? (error.message as string)
          : "An error occurred while deleting Quiz";
      const status =
        error && typeof error === "object" && "status" in error
          ? (error.status as number)
          : 500;
      this.setStatus(status);
      return { message };
    }
  }
}
