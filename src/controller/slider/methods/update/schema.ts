import { zod } from "@ooic/core";
export const body = zod.object({
  productId: zod.number().optional(),
});
export const params = zod.object({
  id: zod.string().regex(/^\d+$/).transform(Number),
});
