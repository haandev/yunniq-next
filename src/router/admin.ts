import { zod } from "@ooic/core";
import handlers from "@/handlers";
import { RouteType, RouteGroupModuleType} from "@ooic/router";

const routes: RouteGroupModuleType = {
  routes: [
    {
      path: "/auth",
      routes: [
        {
          path: "/login",
          method: "post",
          handler: [handlers.auth.login],
          schema: {
            body: zod.object({
              username: zod.string(),
              password: zod.string(),
            }),
          },
        },
        {
          path: "/register",
          method: "post",
          handler: [handlers.auth.passwordChange],
          schema: {
            body: zod
              .object({
                username: zod.string(),
                password: zod.string(),
                passwordConfirm: zod.string(),
                companyName: zod.string(),
              })
              .refine((data) => data.passwordConfirm === data.password, "Passwords don't match"),
          },
        },
        {
          path: "/password-change",
          method: "post",
          handler: [handlers.auth.verifyToken, handlers.auth.passwordChange],
          schema: {
            body: zod
              .object({
                username: zod.string(),
                newPassword: zod.string(),
                newPasswordConfirm: zod.string(),
                oldPassword: zod.string(),
              })
              .refine((data) => data.newPassword === data.newPasswordConfirm, "Passwords don't match"),
          },
        },
        {
          path: "/user",
          method: "get",
          handler: [handlers.auth.verifyToken, handlers.auth.user],
        },
      ],
    },
  ],
};

export default routes;
