import { RequestHandler } from "@ooic/core";
import { schema } from ".";
import { Table } from "@/model/Table";
import uid2 from "uid2";

const create: RequestHandler = async (request, response, next) => {
  try {
    const body = schema.body.parse(request.body);
    const result = await Table.create({
      ...body,
      uid: uid2(10),
      ownerId: request.authUser.id,
    });
    response.send(result);
  } catch (error) {
    next(error);
  }
};

export default create;
