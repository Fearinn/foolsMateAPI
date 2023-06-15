import { BaseError } from "./BaseError.js";

export class BadRequest extends BaseError {
  constructor(message = "Invalid data was provided") {
    super(message, 400);
  }
}
