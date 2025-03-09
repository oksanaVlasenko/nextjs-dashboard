export class ApiError extends Error {
  status: number;
  originalError?: unknown;

  constructor(status: number, message: string, originalError?: unknown) {
    super(message);
    this.status = status;
    this.originalError = originalError;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
