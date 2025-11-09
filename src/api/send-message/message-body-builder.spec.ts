import { MessageBodyBuilder, MessageBodyParams } from "./message-body-builder";

describe("MessageBodyBuilder", () => {
  const builder = new MessageBodyBuilder();

  it("should build a message body with phone, email and notice given full info", () => {
    const params: MessageBodyParams = {
      senderEmail: "sender@example.com",
      senderPhoneNumber: "123-456-7890",
      text: `Hello dear friend,

This is a formal message!

Good day,
your friend bob.`,
      websiteUrl: "example.com",
    };

    const result = builder.buildMessage(params);

    expect(result).toBe(
      `<html><body>Hello dear friend,<br/><br/>This is a formal message!<br/><br/>Good day,<br/>your friend bob.<br/><br/>---<br/><br/><strong>Adresse courriel:</strong> sender@example.com<br/><strong>Numéro de téléphone:</strong> 123-456-7890<br/><em>Ce message a été envoyé depuis le formulaire de contact du site <a href="https://example.com">example.com</a>.</em></body></html>`
    );
  });

  it("should build a message body with email and notice given no phone", () => {
    const params: MessageBodyParams = {
      senderEmail: "sender@example.com",
      text: `Hello dear friend,

This is a formal message!

Good day,
your friend bob.`,
      websiteUrl: "example.com",
    };

    const result = builder.buildMessage(params);

    expect(result).toBe(
      `<html><body>Hello dear friend,<br/><br/>This is a formal message!<br/><br/>Good day,<br/>your friend bob.<br/><br/>---<br/><br/><strong>Adresse courriel:</strong> sender@example.com<br/><em>Ce message a été envoyé depuis le formulaire de contact du site <a href="https://example.com">example.com</a>.</em></body></html>`
    );
  });
});
