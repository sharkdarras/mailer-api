import { RequestHandler } from "express";

export function healthHandler(): RequestHandler {
  return async (req, res, next) => {
    res.json({ status: "ok" });
  };
}
