import { RequestHandler } from "@ooic/core";
import { Slider } from "@/model/Slider";
import { schema } from ".";

const create: RequestHandler = async (request, response, next) => {
  try {
    const body = schema.body.parse(request.body);
    
    const result = await Slider.create({ ...body, ownerId: request.authUser.id });
    response.send(result);
  } catch (error) {
    next(error);
  }
};

export default create;
