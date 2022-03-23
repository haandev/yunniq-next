
import zod from "zod"
export const body = zod.array(zod.object({
  id:zod.number(),
  order:zod.number()
}));
