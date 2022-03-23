
import { zod } from "@ooic/core";
export const body = zod.object({
  productId: zod.number().optional(),
});
