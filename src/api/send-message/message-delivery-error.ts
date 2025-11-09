import { MailerError } from "../error-mapping/mailer-error";

export class MessageDeliveryError extends MailerError {
  public code = "MESSAGE_DELIVERY_ERROR";
  public httpStatusCode = 500;
}
