import { Localizer } from "@/app";
import { Slider } from "@/model/Slider";
import { RequestHandler } from "@ooic/core";
import { schema } from ".";

const get: RequestHandler = async (request, response, next) => {
  try {
    const { language } = schema.query.parse(request.query);

    const result = await Slider.scope([
      "ordered",
      { method: ["locale",language]},
      { method: ["byOwner", request.authUser.id] },
    ]).findAll({});

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
