import { Router } from "@ooic/core";
const router = Router();

import * as table from "@/controller/table";
import * as auth from "@/controller/auth";

router.post("/", auth.verifyToken, table.create);
router.put("/:id", auth.verifyToken, table.update);
router.get("/", auth.verifyToken, table.get);
router.get("/:id", auth.verifyToken, table.getById);
router.delete("/:id", auth.verifyToken, table.destroy);

export default router;
