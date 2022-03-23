import { CategoryLocale } from "@/model/CategoryLocale";
import { RequestHandler } from "@ooic/core";
import { schema } from ".";

const destroy: RequestHandler = async (request, response, next) => {
  try {
    const { id } = schema.params.parse(request.params);
    const instance = await CategoryLocale.scope([
      { method: ["byOwner", request.authUser.id] },
    ]).findByPk(id);

    instance.destroy();
    response.status(200).send("Deleted");
  } catch (error) {
    next(error);
  }
};

export default destroy;