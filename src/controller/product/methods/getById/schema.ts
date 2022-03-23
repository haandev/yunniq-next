import { zod } from "@ooic/core";
export const params = zod.object({
  id: zod.string().regex(/^\d+$/).transform(Number)
});

export const query = zod.object({
  language: zod.string().optional()
});