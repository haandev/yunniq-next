import { zod } from "@ooic/core";

export const query = zod.object({
  language: zod.string().optional(),
  parentCategoryId: zod.number().optional(),
  orderMode: zod.string().optional().default("asc"),
  orderBy: zod.string().optional().default("createdAt"),
});