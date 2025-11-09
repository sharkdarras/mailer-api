import express, { Express } from "express";
import cors from "cors";
import { errorsMapperHandler } from "./error-mapping/error-mapper-handler";
import { ResourceProvider } from "./resource-provider";
import { sendMessageHandler } from "./send-message/send-message-handler";
import { healthHandler } from "./health/health-handler";

export async function createApp(): Promise<Express> {
  const app: Express = express();
  const rp = new ResourceProvider();

  app.use(cors());
  app.use(express.json());
  app.get("/health", healthHandler());
  app.post("/send-message", sendMessageHandler(rp));

  app.use(errorsMapperHandler());

  return app;
}
