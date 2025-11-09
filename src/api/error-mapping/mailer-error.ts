export abstract class MailerError extends Error {
  public abstract code: string;
  public abstract httpStatusCode: number;

  constructor(message: string) {
    super(message);
  }
}
