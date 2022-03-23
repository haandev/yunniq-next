
import { zod } from "@ooic/core";
export const body = zod.object({
  productId: zod.number(),
  locale: zod.string(),
  allergens: zod.string().optional(),
  description: zod.string().optional(),
  title: zod.string().optional(),
});
