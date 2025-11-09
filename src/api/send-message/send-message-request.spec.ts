import { ZodError } from "zod";
import { SendMessageRequest } from "./send-message-request";

test("GivenValidRequest_WhenParsing_ReturnsParsedRequest", () => {
  const input = {
    sender: {
      email: "john.doe@example.com",
      fullName: "John Doe",
      phoneNumber: "123-456-7890",
    },
    subject: "Test Subject",
    body: "Test Body",
    website: "https://example.com",
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
      body: "Test Body",
      website: "https://example.com",
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
      body: "Test Body",
      website: "https://example.com",
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
      body: "Test Body",
      ...(websiteValue !== undefined && { website: websiteValue }),
    };

    expect(() => SendMessageRequest.parse(input)).toThrow(ZodError);
  }
);

test.each([[null], [undefined], [""]])(
  "GivenNoBody_WhenParsing_ThrowsError - %s",
  (bodyValue) => {
    const input = {
      sender: {
        email: "john.doe@example.com",
        fullName: "John Doe",
        phoneNumber: "123-456-7890",
      },
      subject: "Test Subject",
      ...(bodyValue !== undefined && { body: bodyValue }),
      website: "https://example.com",
    };

    expect(() => SendMessageRequest.parse(input)).toThrow(ZodError);
  }
);

test("GivenTooLongBody_WhenParsing_ThrowsError", () => {
  const input = {
    sender: {
      email: "john.doe@example.com",
      fullName: "John Doe",
      phoneNumber: "123-456-7890",
    },
    subject: "Test Subject",
    body: "A".repeat(5001),
    website: "https://example.com",
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
    body: "Test Body",
    website: "https://example.com",
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
    body: "Test Body",
    website: "https://example.com",
  };

  expect(() => SendMessageRequest.parse(input)).toThrow(ZodError);
});
