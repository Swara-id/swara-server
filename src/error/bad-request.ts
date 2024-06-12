import { StatusCodes } from "../constant/httpStatus";
import { CustomAPIError } from "./custom-api-error";

export class BadRequestError extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
