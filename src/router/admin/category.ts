import { Router } from "@ooic/core";

import * as category from "@/controller/category";
import * as auth from "@/controller/auth";

const router = Router();

router.post("/", auth.verifyToken, category.create);
router.put("/:id", auth.verifyToken, category.update);
router.get("/", auth.verifyToken, category.get);
router.get("/:id", auth.verifyToken, category.getById);
router.delete("/:id", auth.verifyToken, category.destroy);
router.post("/reorder", auth.verifyToken, category.reorder);

export default router;
