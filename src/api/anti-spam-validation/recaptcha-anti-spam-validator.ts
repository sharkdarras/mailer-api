import { AntiSpamValidationError } from "./anti-spam-validation-error";
import { AntiSpamValidator } from "./anti-spam-validator";

export class RecaptchaAntiSpamValidator implements AntiSpamValidator {
  async verifyIsNotSpam(token: string, secretKey: string): Promise<void> {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        body: new URLSearchParams({
          secret: secretKey,
          response: token,
        }),
      }
    );

    if (!response.ok) {
      throw new AntiSpamValidationError(
        `recaptcha verification request failed with status '${response.status}'`
      );
    }

    const data = await response.json();

    if (!data.success) {
      throw new AntiSpamValidationError(
        `recaptcha verification failed with error codes ${data[
          "error-codes"
        ]?.join(",")}`
      );
    }

    if (data.score < 0.5) {
      throw new AntiSpamValidationError(
        `recaptcha verification failed due to low score of ${data.score}`
      );
    }

    console.log(`Recaptcha verification succeeded with score ${data.score}.`);
  }
}
