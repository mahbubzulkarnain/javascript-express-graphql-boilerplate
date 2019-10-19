import { IResponse } from "../../interfaces/IResponse";
import response, { errors } from "../../utils/response";
import findByEmail from "./functions/findByEmail";

export default {
  Mutation: {},
  Query   : {
    me: (obj, arg, { email }): Promise<IResponse | Error> => new Promise(async (resolve, reject) => {
      try {
        resolve(response(await findByEmail(email)));
      } catch (e) {
        reject(errors(e));
      }
    }),
  },
};
