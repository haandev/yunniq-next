import https from "https";
import fs from "fs";
import http from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import { OoicConfig } from "./types";
import { initRouter } from "./init-router";
import { initErrorHandlers } from "./init-error-handlers";
import { connect, sync } from "./init-connection";
import { queryParser } from "express-query-parser";
import { swaggerify } from "./swagger-autogen";
import unhandled from "./unhandled";
import packageJson from "./../../../package.json";
import { log } from ".";

export async function ooic(config: OoicConfig) {
  const app = express();
  config.cors?.enabled && app.use(cors(config.cors.options));
  config.morgan?.enabled &&
    process.env.NODE_ENV === "development" &&
    app.use(morgan(config.morgan.format, config.morgan.options));
  config.cookieParser?.enabled &&
    app.use(
      cookieParser(config.cookieParser.secret, config.cookieParser.options)
    );
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(express.json());
  app.use(
    queryParser({
      parseNumber: true,
      parseBoolean: true,
      parseNull: true,
      parseUndefined: true,
    })
  );

  await connect();
  await initRouter(app);
  try {
    if (fs.existsSync("src/model/model_relation_map.ts")) {
      await import("./../../../src/model/model_relation_map");
    } else {
      console.warn(
        "Missing model relation mapper. Please put 'model_relation_map.ts' in src/model directory."
      );
    }
  } catch (err) {}
  await initErrorHandlers(app);
  app.use(unhandled);

  await swaggerify(app);
  await sync();

  if (fs.existsSync("src/model/seeder.ts")) {
    await (await import("./../../../src/model/seeder")).default();
  }

  if (process.env.NODE_ENV === "development") {
    http.createServer(app).listen(process.env.PORT || process.env.APP_PORT);
    log(
      `\nWelcome to ${packageJson.name} v${
        packageJson.version
      }! Listening on port ${process.env.PORT || process.env.APP_PORT}` +
        `\nRunning on environment: ${process.env.NODE_ENV}` +
        `\nhttp://localhost:${process.env.PORT || process.env.APP_PORT}`
    );
  } else {
    http.createServer(app).listen(process.env.PORT || process.env.APP_PORT);
    config.ssl?.enabled &&
      https
        .createServer({ cert: config.ssl.cert, key: config.ssl.key }, app)
        .listen(process.env.SECURE_PORT);
    log(
      `\nWelcome to ${packageJson.name} v${packageJson.version}! Listening on port ${process.env.PORT} and ${process.env.SECURE_PORT}` +
        `\nRunning on environment: ${process.env.NODE_ENV}`
    );
  }
  return app;
}
