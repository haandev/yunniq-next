import { Localizer } from "@/app";
import { Category } from "@/model/Category";
import { NestedChildren, RequestHandler } from "@ooic/core";
import { schema } from ".";


const get: RequestHandler = async (request, response, next) => {
  try {
    const { language, ...query } = schema.query.parse(request.query);

    const result = await NestedChildren({
      model: Category.scope([
        "ordered",
        { method: ["locale", language] },
        { method: ["byOwner", request.authUser.id] },
      ]),
      subItemsKey: "subCategories",
      createArray: true,
      primaryKey:"id",
      parentIdField: "parentCategoryId",
      parentIdEntryPoint: query.parentCategoryId || null,
    });

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
