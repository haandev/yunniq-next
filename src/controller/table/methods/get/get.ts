import { Table } from "@/model/Table";
import { RequestHandler } from "@ooic/core";

const get: RequestHandler = async (request, response, next) => {
  try {
    const result = await Table.scope([
      { method: ["byOwner", request.authUser.id] },
    ]).findAll({ order: [["createdAt", "desc"]] });

    response.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export default get;
