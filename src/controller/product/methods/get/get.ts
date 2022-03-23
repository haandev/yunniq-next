import { Product } from "@/model/Product";
import { RequestHandler } from "@ooic/core";
import { schema } from ".";

const get: RequestHandler = async (request, response, next) => {
  try {
    const query = schema.query.parse(request.query);

    const products = await Product.scope([
      "ordered",
      { method: ["byOwner", request.authUser.id] },
    ]).findAll({
      where: query,
    });
    response.status(200).send(products);
  } catch (error) {
    next(error);
  }
};

export default get;
