import { RequestHandler } from "express";
import { ResourceProvider } from "../resource-provider";
import { SendMessageRequest } from "./send-message-request";
import { validateRequest } from "../request-validation/validate-request";

export function sendMessageHandler(rp: ResourceProvider): RequestHandler {
  const { authorizedWebsitesRepo } = rp;

  return async (req, res, next) => {
    const sendMessageRequest = validateRequest(SendMessageRequest, req.body);

    res.json({ success: true });
  };
}
