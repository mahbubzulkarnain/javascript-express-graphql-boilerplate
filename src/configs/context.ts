import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { IContext } from "../interfaces/IContext";
import verifyIdToken from "../modules/auth/functions/verifyIdToken";

export default async ({ connection, req }: ExpressContext): Promise<IContext> => {
  if (connection) {
    return connection.context;
  }
  if (!req || !req.headers) {
    return;
  }
  const token = req.headers.authorization || "";

  let email;
  if (token) {
    email = (await verifyIdToken(token)).email || "";
  }

  return { email, token };
};
