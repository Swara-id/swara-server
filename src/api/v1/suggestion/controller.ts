import {
  Body,
  Controller,
  Delete,
  FormField,
  Get,
  Path,
  Post,
  Patch,
  Route,
  SuccessResponse,
  UploadedFile
} from "tsoa";
import {
  getAllSuggestion,
  createSuggestion,
  getOneSuggestion,
  deleteOneSuggestion,
  updateOneSuggestion,
  verifyOneSuggestion
} from "./service";
import {
  SuggestionBody,
  SuggestionListResponse,
  SuggestionResponse
} from "./types";

@Route("suggestion")
export default class SuggestionController extends Controller {
  @Get("/")
  @SuccessResponse("200", "Success")
  public async indexAllSuggestion(): Promise<SuggestionListResponse> {
    try {
      const result = await getAllSuggestion();
      this.setStatus(200);
      return { message: "success", data: result, pagination: {} };
    } catch (error) {
      this.setStatus(500);
      return {
        message: "An error occurred while fetching Suggestions",
        data: [],
        pagination: {}
      };
    }
  }

  @Get("{id}")
  public async indexOneSuggestion(
    @Path("id") id: number | string
  ): Promise<SuggestionResponse> {
    try {
      const result = await getOneSuggestion(id);
      if (!result) {
        this.setStatus(404);
        return { message: `No Suggestion found with ID ${id}` };
      }
      this.setStatus(200);
      return { message: "success", data: result };
    } catch (error) {
      this.setStatus(500);
      return { message: "An error occurred while fetching the Suggestion" };
    }
  }
  @Post()
  @SuccessResponse("201", "Created")
  public async postSuggestion(
    @FormField() type: "word" | "letter",
    @FormField() value: string,
    @FormField() userId: number,
    @FormField() challengeId?: number,
    @FormField() userLocation?: string,
    @UploadedFile("file") file?: Express.Multer.File
  ): Promise<SuggestionResponse> {
    try {
      const result = await createSuggestion(
        { type, value, userId, challengeId, userLocation },
        file
      );
      this.setStatus(201);
      return { message: "create suggestion success", data: result };
    } catch (error) {
      console.log(error);
      this.setStatus(500);
      return { message: "An error occurred while creating the Suggestion" };
    }
  }

  @Patch("{id}")
  @SuccessResponse("200", "Updated")
  public async patchSuggestion(
    @Path("id") id: number | string,
    @Body() body: Partial<SuggestionBody>
  ): Promise<SuggestionResponse> {
    try {
      const result = await updateOneSuggestion(id, body);
      this.setStatus(200);
      return {
        message: `Update suggestion ${result.id} success`,
        data: result
      };
    } catch (error) {
      this.setStatus(500);
      return { message: "An error occurred while updating the Suggestion" };
    }
  }

  @Delete("{id}")
  @SuccessResponse("200", "Deleted")
  public async deleteSuggestion(
    @Path("id") id: number | string
  ): Promise<SuggestionResponse> {
    try {
      const result = await deleteOneSuggestion(id);
      this.setStatus(200);
      return {
        message: `Delete suggestion ${result.id} success`,
        data: result
      };
    } catch (error) {
      this.setStatus(500);
      return { message: "An error occurred while deleting the Suggestion" };
    }
  }

  @Patch("{id}/verify")
  @SuccessResponse("200", "Patched")
  public async verifySuggestion(
    @Path("id") id: number | string,
    @Body() { point }: { point: number }
  ): Promise<{ message: string }> {
    try {
      const { message } = await verifyOneSuggestion(id, point);
      this.setStatus(200);
      return {
        message
      };
    } catch (error) {
      this.setStatus(500);
      return { message: "An error occurred while verifying the Suggestion" };
    }
  }
}
