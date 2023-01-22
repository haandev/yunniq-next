import { RequestHandler } from "@ooic/core";

export const user: RequestHandler = async (request, response, next) => {
  try {
    response.status(200).send(request.authUser);
  } catch (error) {
    next(error)
  }
}

export default user