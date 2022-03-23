import { zod } from "@ooic/core";

export const query = zod.object({
  productId: zod.number(),
});