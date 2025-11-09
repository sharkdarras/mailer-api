import { ErrorRequestHandler } from "express";
import { MailerError } from "./mailer-error";
import { UnexpectedError } from "./unexpected-error";

export function errorsMapperHandler(): ErrorRequestHandler {
  return (err, _req, res, _next) => {
    let mailerError: MailerError;

    if (err instanceof MailerError) {
      mailerError = err;
    } else {
      mailerError = new UnexpectedError(err);
    }

    console.error(err);
    res.status(mailerError.httpStatusCode).json({
      code: mailerError.code,
      message: mailerError.message,
    });
  };
}
