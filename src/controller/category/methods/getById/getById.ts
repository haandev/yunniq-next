import { Category } from "@/model/Category";
import { RequestHandler } from "@ooic/core";
import { schema } from ".";

const getById: RequestHandler = async (request, response, next) => {
  try {
    const { id } = schema.params.parse(request.params);
    const instance = await Category.scope([
      { method: ["byOwner", request.authUser.id] },
    ]).findByPk(id);

    response.status(200).send(instance);
  } catch (error) {
    next(error);
  }
};

export default getById;
