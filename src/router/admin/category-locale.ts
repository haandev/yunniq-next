import { Router } from "@ooic/core";
const router = Router();

import * as categoryLocale from "@/controller/category-locale";
import * as auth from "@/controller/auth";

router.post("/", auth.verifyToken, categoryLocale.create);
router.put("/:id", auth.verifyToken, categoryLocale.update);
router.get("/", auth.verifyToken, categoryLocale.get);
router.delete("/:id", auth.verifyToken, categoryLocale.destroy);

export default router;
