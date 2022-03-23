import { RequestHandler } from "@ooic/core";
import { Category } from "@/model/Category";
import { schema } from ".";

const reorder: RequestHandler = async (request, response, next) => {
  try {
    const list = schema.body.parse(request.body);
    list.forEach((item) => {
      Category.findByPk(item.id).then((instance) => {
        instance.update({
          order: item.order,
        });
      });
    });
    response.status(200).send();
  } catch (error) {
    next(error);
  }
};

export default reorder;
