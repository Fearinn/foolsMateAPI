import { BaseError } from "./BaseError.js";

export class NotFound extends BaseError {
  constructor(item = "page", message?: string) {
    super(message || `${item} not found`, 404);
  }
}
