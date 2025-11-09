import { z, ZodError } from "zod";
import { InvalidRequestError } from "./invalid-request-error";

export function validateRequest<TInput, TOutput>(
  schema: z.ZodType<TOutput, TInput>,
  body: any
): TOutput {
  try {
    return schema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      const message = z.prettifyError(error);
      throw new InvalidRequestError(message);
    }
    throw error;
  }
}
