import express, { Express } from "express";
import cors from "cors";
import { errorsMapper } from "./error-mapper";

export async function createApp(): Promise<Express> {
  const app: Express = express();

  app.use(cors());
  app.use(express.json());
  app.use("/", (_req, res) => {
    res.json({ message: "Mailer API is running" });
  });
  app.use(errorsMapper());

  return app;
}
