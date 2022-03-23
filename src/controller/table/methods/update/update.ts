import { Table } from "@/model/Table";
import { RequestHandler } from "@ooic/core";
import { schema } from ".";
const update: RequestHandler = async (request, response, next) => {
  try {
    const { id } = schema.params.parse(request.params);

    const instance = await Table.scope([
      { method: ["byOwner", request.authUser.id] },
    ]).findByPk(id)

    instance.update(schema.body.parse(request.body));
    response.status(200).send(instance);
  } catch (error) {
    next(error);
  }
};

export default update;
