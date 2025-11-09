import { MailerError } from "./mailer-error";

export class UnexpectedError extends MailerError {
  public code = "UNEXPECTED_ERROR";
  public httpStatusCode = 500;

  constructor(err: Error) {
    super(`${err.name}: ${err.message}`);
  }
}
