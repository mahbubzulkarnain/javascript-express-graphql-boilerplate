import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import * as fs from "fs";
import { merge } from "lodash";
import context from "./configs/context";

const ENV = (process.env.NODE_ENV || "dev").toLowerCase();
const DEV = ENV !== "prod" && ENV !== "production";

const dirmodules = `${__dirname}/modules`;
const modules = fs.readdirSync(dirmodules)
  .filter(
    (dir) =>
      fs.existsSync(`${dirmodules}/${dir}/resolvers.ts`) ||
      fs.existsSync(`${dirmodules}/${dir}/schema.ts`),
  );
const resources = (file) => {
  const path = `${dirmodules}/${file}`;
  if (fs.existsSync(path + ".ts")) {
    return require(path);
  }
  if (fs.existsSync(path)) {
    return {
      default: (fs.readdirSync(path)).reduce((result, item) => merge(
        result,
        (require(`${path}/${item}`)).default,
      ), {}),
    };
  }
};

export const graphqlPath = "/graphql";

export default (new ApolloServer({
  context,
  debug     : DEV,
  playground: { settings: { "editor.theme": "light" } },
  schema    : makeExecutableSchema({
    resolvers       : modules.reduce((result, item) => merge(result, resources(item + "/resolvers").default), {}),
    schemaDirectives: modules.reduce((result, item) => merge(result, resources(item + "/directives").default), {}),
    typeDefs        : modules.map((item) => resources(item + "/schema").default),
  }),
  tracing   : DEV,
}));
