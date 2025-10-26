import { ErrorRequestHandler } from "express";

export function errorsMapper(): ErrorRequestHandler {
  return (err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({
      error: err.name,
      message: err.message,
    });
  };
}
