import { MailerError } from "../error-mapping/mailer-error";

export class AuthorizedWebsiteLoadingError extends MailerError {
  public code = "AUTHORIZED_WEBSITE_LOADING_ERROR";
  public httpStatusCode = 500;
}
