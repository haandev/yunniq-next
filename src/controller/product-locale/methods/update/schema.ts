import { zod } from "@ooic/core";
export const body = zod.object({
  productId: zod.number().optional(),
  locale: zod.string().optional(),
  allergens: zod.string().optional(),
  description: zod.string().optional(),
  title: zod.string().optional(),
});
export const params = zod.object({
  id: zod.string().regex(/^\d+$/).transform(Number)
});
