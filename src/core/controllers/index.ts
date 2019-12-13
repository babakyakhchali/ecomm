import multer = require("multer")
import { ROOT_DIR } from "..";
import { join } from "path";
import uuid = require("uuid");
import { ensureDirSync } from "fs-extra";


export const fileUploadOptions = {
    storage: multer.diskStorage({
        destination: (_req: any, _file: any, cb: any) => {
            const dir = join(ROOT_DIR, '/uploads/tmp', uuid.v4());
            ensureDirSync(dir);
            cb(null,  dir);
        },
        filename: (_req: any, file: any, cb: any) => {
            cb(null, file.originalname);
        }
    }),
    fileFilter: (_req: any, _file: any, cb: any) => {
        cb(null, true);
    },
    limits: {
        fieldNameSize: 255,
        fileSize: 1024 * 1024 * 2
    }
}