export interface AntiSpamValidator {
  verifyIsNotSpam(token: string, secretKey: string): Promise<void>;
}
