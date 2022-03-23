import { Category } from "@/model/Category";
import { CategoryLocale } from "@/model/CategoryLocale";
import { RequestHandler } from "@ooic/core";
import { schema } from ".";
const update: RequestHandler = async (request, response, next) => {
  try {
    const { id } = schema.params.parse(request.params);

    const instance = await CategoryLocale.scope([
      { method: ["byOwner", request.authUser.id] },
    ]).findByPk(id);

    instance.update(schema.body.parse(request.body));
    response.status(200).send(instance);
  } catch (error) {
    next(error);
  }
};

export default update;
