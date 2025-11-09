import { readEnvVarOrThrow } from "../read-env-var";
import { MessageDeliveryError } from "./message-delivery-error";
import { Message, MessageSender } from "./message-sender";
import nodemailer from "nodemailer";

export class ZeptoMailMessageSender implements MessageSender {
  async send(message: Message): Promise<void> {
    var transport = nodemailer.createTransport({
      host: "smtp.zeptomail.com",
      port: 587,
      auth: {
        user: this.zeptoMailApiKeyName,
        pass: this.zeptoMailApiKey,
      },
    });

    var mailOptions = {
      from: `"${
        message.sender.fullName || message.sender.email
      }" <noreply@mail.wavdev.com>`,
      to: message.recipientEmail,
      subject: message.subject,
      html: message.body,
      replyTo: `"${message.sender.fullName || message.sender.email}" <${
        message.sender.email
      }>`,
    };

    try {
      await transport.sendMail(mailOptions);
    } catch (error) {
      console.error("Unexpected error while sending email:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Unexpected error while sending email.";
      throw new MessageDeliveryError(message);
    }
  }

  private get zeptoMailApiKeyName(): string {
    return readEnvVarOrThrow(
      "ZEPTO_MAIL_API_KEY_NAME",
      new MessageDeliveryError("Missing Zepto Mail credentials: api key name.")
    );
  }

  private get zeptoMailApiKey(): string {
    return readEnvVarOrThrow(
      "ZEPTO_MAIL_API_KEY",
      new MessageDeliveryError("Missing Zepto Mail credentials: api key.")
    );
  }
}
