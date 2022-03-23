import { RequestHandler, StatusCodes } from "@ooic/core";
import { schema } from ".";
import { CategoryLocale } from "@/model/CategoryLocale";
import { Category } from "@/model/Category";

const create: RequestHandler = async (request, response, next) => {
  try {
    const body = schema.body.parse(request.body);
    const target = await Category.scope([
      { method: ["byOwner", request.authUser.id] },
    ]).count({
      where: { id: Number(body.categoryId) },
    });

    if (!target)
      throw {
        statusCode: StatusCodes.FORBIDDEN,
        message: "You are not allowed to add locale to this entity",
      };

    const result = await CategoryLocale.create({...body,ownerId:request.authUser.id});
    response.send(result);
  } catch (error) {
    next(error);
  }
};

export default create;
