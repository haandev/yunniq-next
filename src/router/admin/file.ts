import { express, Router, fileUpload } from "@ooic/core";
import * as file from "@/controller/file";
import * as auth from "@/controller/auth";

const router = Router();

router.use("/serve", express.static("uploads"));
router.post("/upload", auth.verifyToken, fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }), file.upload);

export default router;
