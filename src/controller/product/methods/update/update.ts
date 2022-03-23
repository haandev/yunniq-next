import { Product } from "@/model/Product";
import { RequestHandler } from "@ooic/core";
import { schema } from ".";

const update: RequestHandler = async (request, response, next) => {
  try {
    const { id } = schema.params.parse(request.params);
    const body = schema.body.parse(request.body);

    const instance = await Product.scope([
      { method: ["byOwner", request.authUser.id] },
    ]).findByPk(id)

    instance.update(body);
    response.status(200).send(instance);
  } catch (error) {
    next(error);
  }
};

export default update