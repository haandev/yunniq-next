import { zod } from "@ooic/core";
export const body = zod.object({
  allergens: zod.string().optional(),
  categoryId: zod.number().optional(),
  description: zod.string().optional(),
  image: zod.string().optional(),
  title: zod.string().optional(),
  price: zod.string().optional(),
  className: zod.string().optional(),
});

export const params = zod.object({
  id: zod.string().regex(/^\d+$/).transform(Number)
});
