import request from "supertest";
import { createApp } from "../create-app";
import { App } from "supertest/types";
import { SendMessageRequest } from "./send-message-request";
import { ResourceProvider } from "../resource-provider";
import { AntiSpamValidationError } from "../anti-spam-validation/anti-spam-validation-error";

describe("POST /send-message", () => {
  const ANTI_SPAM_TOKEN = "test-anti-spam-token";
  const TESTCOM_RECAPTCHA_SECRET_KEY = "test-secret-key";

  let app: App;

  beforeEach(async () => {
    app = await createApp(new CustomResourceProvider());
  });

  it("should return success response given valid request", async () => {
    const sendMessageRequest: SendMessageRequest = {
      sender: {
        email: "sender@some-domain.com",
      },
      subject: "Hello",
      text: "This is a test message.",
      website: "test.com",
      antiSpamToken: ANTI_SPAM_TOKEN,
    };

    const response = await request(app)
      .post("/send-message")
      .send(sendMessageRequest);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
    });
  });

  class CustomResourceProvider extends ResourceProvider {
    public get antiSpamValidator() {
      return {
        async verifyIsNotSpam(token: string, secretKey: string) {
          if (
            token !== ANTI_SPAM_TOKEN ||
            secretKey !== TESTCOM_RECAPTCHA_SECRET_KEY
          ) {
            throw new AntiSpamValidationError("Invalid token or secret key.");
          }
        },
      };
    }
  }
});
