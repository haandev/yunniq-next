import { Product } from "@/model/Product";
import { RequestHandler } from "@ooic/core";
import { schema } from ".";

const destroy: RequestHandler = async (request, response, next) => {
  try {
    const { id } = schema.params.parse(request.params);
    const instance = await Product.scope([
      { method: ["byOwner", request.authUser.id] },
    ]).findByPk(id, {
      attributes: { exclude: ["categoryId"] },
      include: [{ association: "category", attributes: ["title", "id"] }],
    });

    response.status(200).send(instance);
  } catch (error) {
    next(error);
  }
};

export default destroy;
