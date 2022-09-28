
import { zod } from "@ooic/core";
export const body = zod.object({
  title: zod.string(),
  image: zod.string().optional(),
  className: zod.string().optional(),
  order: zod.number().optional(),
  parentId: zod.number().optional(),
});
