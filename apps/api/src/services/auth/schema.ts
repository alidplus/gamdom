import z from "zod";

export const zSignSchema = z.object({
  email: z.string().email(),
  password: z.string().transform(String.prototype.toUpperCase),
});
