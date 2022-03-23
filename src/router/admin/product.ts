import { Router } from "@ooic/core";

import * as product from "@/controller/product";
import * as auth from "@/controller/auth";

const router = Router();

router.post("/", auth.verifyToken, product.create);
router.put("/:id", auth.verifyToken, product.update);
router.get("/", auth.verifyToken, product.get);
router.get("/:id", auth.verifyToken, product.getById);
router.delete("/:id", auth.verifyToken, product.destroy);
router.post("/reorder", auth.verifyToken, product.reorder);

export default router;
