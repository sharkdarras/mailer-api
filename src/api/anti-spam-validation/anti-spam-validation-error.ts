import { MailerError } from "../error-mapping/mailer-error";

export class AntiSpamValidationError extends MailerError {
  public code = "ANTI_SPAM_VALIDATION_ERROR";
  public httpStatusCode = 400;

  constructor(reason: string) {
    super(`Anti-spam validation failed: ${reason}`);
  }
}
