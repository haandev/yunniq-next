import { User } from "@/model/User";
import bcrypt from "bcryptjs";
import { RequestHandler } from "@ooic/core";

export const register: RequestHandler = async (request, response, next) => {
  try {
    const body = request.body;

    await User.create({
      ...body,
      password: await bcrypt.hash(body.password, 10),
    });

    next();
  } catch (error) {
    next(error);
  }
};

export default register;
