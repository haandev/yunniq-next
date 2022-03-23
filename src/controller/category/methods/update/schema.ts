import { zod } from "@ooic/core";
export const body = zod.object({
  color: zod.string().optional(),
  title: zod.string().optional(),
  image: zod.string().optional(),
  className: zod.string().optional(),
  order: zod.number().optional(),
  parentCategoryId: zod.number().optional(),
});
export const params = zod.object({
  id: zod.string().regex(/^\d+$/).transform(Number),
});
