import { MailerError } from "../error-mapping/mailer-error";

export class WebsiteNotFoundError extends MailerError {
  public code = "WEBSITE_NOT_FOUND";
  public httpStatusCode = 404;

  constructor(websiteUrl: string) {
    super(`No website registered for url '${websiteUrl}'.`);
  }
}
