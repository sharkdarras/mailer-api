import { App } from "aws-cdk-lib";
import { account, region } from "./config";
import { MailerStack } from "./mailer-stack";

export const app = new App();
new MailerStack(app, { env: { account, region } });
