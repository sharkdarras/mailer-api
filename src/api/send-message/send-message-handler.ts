import { RequestHandler } from "express";
import { ResourceProvider } from "../resource-provider";
import { SendMessageRequest } from "./send-message-request";
import { validateRequest } from "../request-validation/validate-request";
import { WebsiteNotFoundError } from "../websites/website-not-found-error";

export function sendMessageHandler(rp: ResourceProvider): RequestHandler {
  const {
    authorizedWebsitesRepo,
    messageSender,
    messageBodyBuilder,
    antiSpamValidator,
  } = rp;

  return async (req, res, next) => {
    const sendMessageRequest = validateRequest(SendMessageRequest, req.body);

    const website = await authorizedWebsitesRepo.getAuthorizedWebsite(
      sendMessageRequest.website
    );

    if (!website) {
      throw new WebsiteNotFoundError(sendMessageRequest.website);
    }

    await antiSpamValidator.verifyIsNotSpam(
      sendMessageRequest.antiSpamToken,
      website.recaptchaSecretKey
    );

    const messageBody = messageBodyBuilder.buildMessage({
      senderEmail: sendMessageRequest.sender.email,
      senderPhoneNumber: sendMessageRequest.sender.phoneNumber,
      text: sendMessageRequest.text,
      websiteUrl: sendMessageRequest.website,
    });

    await messageSender.send({
      sender: sendMessageRequest.sender,
      recipientEmail: website.contactEmail,
      subject: sendMessageRequest.subject,
      body: messageBody,
    });

    res.json({ success: true });
  };
}
