import { RequestHandler, StatusCodes } from "@ooic/core";
import { schema } from ".";
import { ProductLocale } from "@/model/ProductLocale";
import { Product } from "@/model/Product";

const create: RequestHandler = async (request, response, next) => {
  try {
    const body = schema.body.parse(request.body);
    const target = await Product.scope([
      { method: ["byOwner", request.authUser.id] },
    ]).count({
      where: { id: Number(body.productId) },
    });

    if (!target)
      throw {
        statusCode: StatusCodes.FORBIDDEN,
        message: "You are not allowed to add locale to this entity",
      };

    const result = await ProductLocale.create({...body,ownerId:request.authUser.id});
    response.send(result);
  } catch (error) {
    next(error);
  }
};

export default create;
