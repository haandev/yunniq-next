import fs from "fs";
import { OoicConfig, ooic, LocalizerFactory, Model } from "@ooic/core";
import { SmartModel } from "./model/SmartModel";
import { initSmartModels } from "./initSmartModels";
import asyncSmartModelDataSeed from "./seedSmartModelData";
import { ModelStatic } from "../npm-local/@ooic/core";
export const SmartModels: Array<[string,ModelStatic<any>]> = [];
const config: OoicConfig = {
  cors: {
    enabled: true,
    options: {
      credentials: true,
      origin: function (_origin, callback) {
        callback(null, true);
      },
    },
  },
  morgan: {
    enabled: true,
    format: "combined",
  },
  ssl: {
    enabled: true,
    key: fs.readFileSync("ssl/private.key"),
    cert: fs.readFileSync("ssl/certificate.crt"),
  },
  cookieParser: {
    enabled: true,
  },
};

(async () => {
  const app = await ooic(config);
  await initSmartModels();
  await asyncSmartModelDataSeed();
})();

export const Localizer = LocalizerFactory({
  localeShortCodeKey: "locale",
  localesArrayKey: "locales",
});
