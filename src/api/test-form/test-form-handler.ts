import { RequestHandler } from "express";
import { testFormTemplate } from "./test-form-template";

export function testFormHandler(): RequestHandler {
  return async (req, res, next) => {
    try {
      res.set("Content-Type", "text/html");
      res.send(testFormTemplate);
    } catch (error) {
      next(error);
    }
  };
}
