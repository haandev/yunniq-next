import { RequestHandler } from "@ooic/core";
import { ZodSchema } from "zod";

export declare type RoutesType = Array<RouteType>;

export declare type RouteType = RouteGroupType | SingleRouteType;

export declare type RouteGroupType = {
  path: string;
} & RouteGroupModuleType;

export declare type SingleRouteType = {
  path: string;
} & SingleRouteModuleType;

export type RouteGroupModuleType = {
  routes: RoutesType;
};

export type SingleRouteModuleType = {
  method: "post" | "put" | "get" | "delete" | "patch";
  handler: Array<RequestHandler>;
  schema?: RequestSchemaType;
  routes?: RoutesType;
};
export declare type RequestSchemaType = {
  body?: ZodSchema<any>;
  query?: ZodSchema<any>;
  params?: ZodSchema<any>;
};
