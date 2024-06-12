import { StatusCodes } from "../constant/httpStatus";
import { CustomAPIError } from "./custom-api-error";

export class UnauthenticatedError extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
