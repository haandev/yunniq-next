import fs from "fs";
import { OoicConfig, ooic, LocalizerFactory } from "@ooic/core";
import { SmartModel } from "./model/SmartModel";
import { initSmartModels } from "./initSmartModels";
export const SmartModels = {};
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
  console.log(`\n\x1B[32mSmartModels synchronized successfully.\x1B[0m  `);
})();

export const Localizer = LocalizerFactory({
  localeShortCodeKey: "locale",
  localesArrayKey: "locales",
});
