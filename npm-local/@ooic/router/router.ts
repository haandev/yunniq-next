import fs from "fs";
import { toKebabCase } from "@ooic/utils";
import { Express, RequestHandler } from "express";
import { RequestSchemaType, RouteGroupModuleType, RouteType, SingleRouteModuleType } from "./types";

const loadRouteFolder = (app, folderName) => {
  const items = fs.readdirSync(`${folderName}/`, {
    withFileTypes: true,
  });
  items.forEach(async (item) => {
    if (item.isFile()) {
      const loadedModule = await import(`${folderName}/${item.name}`);
      const name = toKebabCase(item.name.split(".")[0]);
      const router: RouteGroupModuleType | SingleRouteModuleType = loadedModule.default;

      if (name !== "index") routeMounter(app, router as RouteType, `${folderName}/${name}`);
      else routeMounter(app, router as RouteType, `${folderName}`);

    } else {
      loadRouteFolder(app, folderName + "/" + item.name);
    }
  });
};

const routeMounter = (app, router: RouteType, path: string) => {
  if ("method" in router) {
    app[router.method](
      `${path}`,
      ...("schema" in router ? [RequestValidationCtor(router.schema), ...router.handler] : [...router.handler])
    );
  }

  if ("routes" in router) {
    router.routes.forEach((subRouter) => {
      routeMounter(app, subRouter, `${path}${subRouter.path}`);
    });
  }
};

export const initRouter = async (app: Express, path: string) => {
  loadRouteFolder(app, path);
};

export const RequestValidationCtor = (schema: RequestSchemaType) => {
  const requestValidationMiddleware: RequestHandler = async (request, response, next) => {
    try {
      if (schema.body) request.body = schema.body.parse(request.body);
      if (schema.query) request.query = schema.body.parse(request.query);
      if (schema.params) request.params = schema.body.parse(request.params);
    } catch (error) {
      next(error);
    }
  };
  return requestValidationMiddleware;
};

//"src/router/"
