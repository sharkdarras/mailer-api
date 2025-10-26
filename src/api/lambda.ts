import serverless, { Handler } from "serverless-http";
import { createApp } from "./create-app";

const createHandler = async () => {
  const app = await createApp();
  return serverless(app);
};

let cachedHandler: Handler;

export const handler = async (event: object, context: object) => {
  if (!cachedHandler) {
    cachedHandler = await createHandler();
  }
  return cachedHandler(event, context);
};
