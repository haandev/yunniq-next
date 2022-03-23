import { RequestHandler } from "@ooic/core";
import { Category } from "@/model/Category";
import { schema } from ".";

const create: RequestHandler = async (request, response, next) => {
  try {
    const body = schema.body.parse(request.body);
    
    const result = await Category.create({ ...body, ownerId: request.authUser.id });
    response.send(result);
  } catch (error) {
    next(error);
  }
};

export default create;
