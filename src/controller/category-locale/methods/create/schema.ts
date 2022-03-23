
import { zod } from "@ooic/core";
export const body = zod.object({
  categoryId: zod.number(),
  locale: zod.string(),
  title: zod.string().optional(),
});
