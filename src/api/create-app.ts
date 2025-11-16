import express, { Express } from "express";
import cors from "cors";
import { errorsMapperHandler } from "./error-mapping/error-mapper-handler";
import { ResourceProvider } from "./resource-provider";
import { sendMessageHandler } from "./send-message/send-message-handler";
import { healthHandler } from "./health/health-handler";
import { testFormHandler } from "./test-form/test-form-handler";

export async function createApp(
  rp: ResourceProvider = new ResourceProvider()
): Promise<Express> {
  const app: Express = express();

  app.use(cors());
  app.use(express.json());
  app.get("/health", healthHandler());
  app.post("/send-message", sendMessageHandler(rp));

  if (process.env.ENV === "dev") {
    app.get("/test-form", testFormHandler());
  }

  app.use(errorsMapperHandler());

  return app;
}
