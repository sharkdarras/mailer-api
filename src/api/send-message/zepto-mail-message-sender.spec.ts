import { Message } from "./message-sender";
import { ZeptoMailMessageSender } from "./zepto-mail-message-sender";

describe("ZeptoMailMessageSender", () => {
  it.skipIf(false)("should send an email", async () => {
    const sender = new ZeptoMailMessageSender();
    const message: Message = {
      sender: {
        email: "test-sender@email.com",
        fullName: "Test Sender",
      },
      recipientEmail:
        process.env.TEST_EMAIL_RECIPIENT || "test-recipient@email.com",
      subject: "Test Email",
      body: "<p>This is a test email.</p>",
    };

    await expect(sender.send(message)).resolves.toBeUndefined();
  });
});
