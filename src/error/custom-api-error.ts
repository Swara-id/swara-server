export class CustomAPIError extends Error {
  public statusCode: number | undefined;

  constructor(message: string) {
    super(message);
  }
}
