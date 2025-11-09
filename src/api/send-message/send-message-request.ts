import * as z from "zod";

export const SendMessageRequest = z.object({
  sender: z.object({
    email: z.email(),
    fullName: z.string().optional(),
    phoneNumber: z.string().optional(),
  }),
  subject: z.string().nonempty().max(250),
  body: z.string().nonempty().max(5000),
  website: z.string().nonempty(),
});
export type SendMessageRequest = z.infer<typeof SendMessageRequest>;
