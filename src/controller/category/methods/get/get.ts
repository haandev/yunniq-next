import { Localizer } from "@/app";
import { Category } from "@/model/Category";
import { RequestHandler } from "@ooic/core";
import { schema } from ".";

const get: RequestHandler = async (request, response, next) => {
  try {
    const { language, ...query } = schema.query.parse(request.query);

    const result = await Category.getChildrenByPk(null, null, [
      "ordered",
      { method: ["locale", language] },
      { method: ["byOwner", request.authUser.id] },
    ]);

    if (language) {
      const localized = Localizer(result, language);
      return response.status(200).send(localized);
    }

    response.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export default get;
 