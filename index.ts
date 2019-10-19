try {
  require('dotenv').config();
} catch (e) {
  log.error(errors(e));
}

import graphql, { graphqlPath } from './src/graphql';
import app, { hostname, port } from './src/app';
import log from "./src/utils/log";
import { errors } from "./src/utils/response";

graphql
  .applyMiddleware({ app, path: graphqlPath, cors: true });

app
  .listen(port, hostname, (error) => {
    if (error) {
      log.error(error)
    }
    log.info(`>>> 🌎 Open ${hostname}:${port}${graphql.graphqlPath} in your browser.`)
  });
