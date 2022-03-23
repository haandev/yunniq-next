import { Router } from "@ooic/core";

import * as auth from "@/controller/auth";

const router = Router();

router.post("/login", auth.login);
router.post("/register", auth.register, auth.login);
router.post("/password-change", auth.verifyToken, auth.passwordChange);
router.get("/user", auth.verifyToken, auth.user);
router.get("/access-token", auth.verifyToken, auth.user);

export default router;
