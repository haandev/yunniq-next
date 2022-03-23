import { ProductLocale } from "@/model/ProductLocale";
import { RequestHandler } from "@ooic/core";
import { schema } from ".";

const get: RequestHandler = async (request, response, next) => {
  try {
    const query = schema.query.parse(request.query);

    const result = await ProductLocale.scope([
      { method: ["byOwner", request.authUser.id] },
    ]).findAll({
      where: query,
      order: [["createdAt", "desc"]],
    });
    response.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export default get;