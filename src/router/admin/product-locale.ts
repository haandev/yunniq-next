import { Router } from "@ooic/core";
const router = Router();

import * as productLocale from "@/controller/product-locale";
import * as auth from "@/controller/auth";

router.post("/", auth.verifyToken, productLocale.create);
router.put("/:id", auth.verifyToken, productLocale.update);
router.get("/", auth.verifyToken, productLocale.get);
router.delete("/:id", auth.verifyToken, productLocale.destroy);

export default router;
