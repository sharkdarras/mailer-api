import { ZodError } from "zod";
import { SendMessageRequest } from "./send-message-request";

describe("SendMessageRequest Schema", () => {
  test("GivenValidRequest_WhenParsing_ReturnsParsedRequest", () => {
    const input = {
      sender: {
        email: "john.doe@example.com",
        fullName: "John Doe",
        phoneNumber: "123-456-7890",
      },
      subject: "Test Subject",
      text: "Test Body",
      website: "https://example.com",
      antiSpamToken: "test-anti-spam-token",
    };

    const result = SendMessageRequest.parse(input);

    expect(result).toEqual(input);
  });

  test.each([[null], [undefined], [""]])(
    "GivenNoEmail_WhenParsing_ThrowsError - %s",
    (emailValue) => {
      const input = {
        sender: {
          ...(emailValue !== undefined && { email: emailValue }),
          fullName: "John Doe",
          phoneNumber: "123-456-7890",
        },
        subject: "Test Subject",
        text: "Test Body",
        website: "https://example.com",
        antiSpamToken: "test-anti-spam-token",
      };

      expect(() => SendMessageRequest.parse(input)).toThrow(ZodError);
    }
  );

  test.each([[null], [undefined], [""]])(
    "GivenNoSubject_WhenParsing_ThrowsError - %s",
    (subjectValue) => {
      const input = {
        sender: {
          email: "john.doe@example.com",
          fullName: "John Doe",
          phoneNumber: "123-456-7890",
        },
        ...(subjectValue !== undefined && { subject: subjectValue }),
        text: "Test Body",
        website: "https://example.com",
        antiSpamToken: "test-anti-spam-token",
      };

      expect(() => SendMessageRequest.parse(input)).toThrow(ZodError);
    }
  );

  test.each([[null], [undefined], [""]])(
    "GivenNoWebsite_WhenParsing_ThrowsError - %s",
    (websiteValue) => {
      const input = {
        sender: {
          email: "john.doe@example.com",
          fullName: "John Doe",
          phoneNumber: "123-456-7890",
        },
        subject: "Test Subject",
        text: "Test Body",
        ...(websiteValue !== undefined && { website: websiteValue }),
        antiSpamToken: "test-anti-spam-token",
      };

      expect(() => SendMessageRequest.parse(input)).toThrow(ZodError);
    }
  );

  test.each([[null], [undefined], [""]])(
    "GivenNoText_WhenParsing_ThrowsError - %s",
    (textValue) => {
      const input = {
        sender: {
          email: "john.doe@example.com",
          fullName: "John Doe",
          phoneNumber: "123-456-7890",
        },
        subject: "Test Subject",
        ...(textValue !== undefined && { text: textValue }),
        website: "https://example.com",
        antiSpamToken: "test-anti-spam-token",
      };

      expect(() => SendMessageRequest.parse(input)).toThrow(ZodError);
    }
  );

  test("GivenTooLongText_WhenParsing_ThrowsError", () => {
    const input = {
      sender: {
        email: "john.doe@example.com",
        fullName: "John Doe",
        phoneNumber: "123-456-7890",
      },
      subject: "Test Subject",
      text: "A".repeat(5001),
      website: "https://example.com",
      antiSpamToken: "test-anti-spam-token",
    };

    expect(() => SendMessageRequest.parse(input)).toThrow(ZodError);
  });

  test("GivenTooLongSubject_WhenParsing_ThrowsError", () => {
    const input = {
      sender: {
        email: "john.doe@example.com",
        fullName: "John Doe",
        phoneNumber: "123-456-7890",
      },
      subject: "A".repeat(251),
      text: "Test Body",
      website: "https://example.com",
      antiSpamToken: "test-anti-spam-token",
    };

    expect(() => SendMessageRequest.parse(input)).toThrow(ZodError);
  });

  test("GivenInvalidEmail_WhenParsing_ThrowsError", () => {
    const input = {
      sender: {
        email: "invalid-email",
        fullName: "John Doe",
        phoneNumber: "123-456-7890",
      },
      subject: "Test Subject",
      text: "Test Body",
      website: "https://example.com",
      antiSpamToken: "test-anti-spam-token",
    };

    expect(() => SendMessageRequest.parse(input)).toThrow(ZodError);
  });

  test.each([[null], [undefined], [""]])(
    "GivenNoAntiSpamToken_WhenParsing_ThrowsError - %s",
    (tokenValue) => {
      const input = {
        sender: {
          email: "john.doe@example.com",
          fullName: "John Doe",
          phoneNumber: "123-456-7890",
        },
        subject: "Test Subject",
        text: "Test Body",
        website: "https://example.com",
        ...(tokenValue !== undefined && { antiSpamToken: tokenValue }),
      };

      expect(() => SendMessageRequest.parse(input)).toThrow(ZodError);
    }
  );
});
