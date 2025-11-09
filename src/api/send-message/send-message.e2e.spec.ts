import request from "supertest";
import { createApp } from "../create-app";
import { App } from "supertest/types";
import { SendMessageRequest } from "./send-message-request";

describe("POST /send-message", () => {
  let app: App;

  beforeEach(async () => {
    app = await createApp();
  });

  it("should return success response given valid request", async () => {
    const sendMessageRequest: SendMessageRequest = {
      sender: {
        email: "sender@some-domain.com",
      },
      subject: "Hello",
      text: "This is a test message.",
      website: "test.com",
    };

    const response = await request(app)
      .post("/send-message")
      .send(sendMessageRequest);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
    });
  });
});
