import { MailerError } from "../error-mapping/mailer-error";

export class InvalidRequestError extends MailerError {
  public code = "INVALID_REQUEST";
  public httpStatusCode = 400;
}
