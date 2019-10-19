import { IResponse } from "../interfaces/IResponse";

const ENV = (process.env.NODE_ENV || "dev").toLowerCase();

export const errors = (e: any) => new Error(
  e.response
    ? (
      e.response.data.error
        ? e.response.data.error.message || e.response.data.error
        : e.response.data.message || e.response.data
    )
    : e.message || e,
);

export const MOCK_RESULT = (obj, args, context, info) => ({
  config    : {},
  data      : {
    edges     : {
      args   : JSON.stringify(args),
      context: JSON.stringify(context),
      info   : JSON.stringify(info),
      obj    : JSON.stringify(obj),
    },
    message   : `Server has been started, with stage ${ENV}.`,
    pageInfo  : {
      hasNextPage: false,
      hasPrevPage: false,
      nextCursor : "",
      prevCursor : "",
    },
    totalCount: 0,
  },
  headers   : {},
  status    : 200,
  statusText: "200",
});

export default (arg: any, httpStatusCode = 0, message = ""): IResponse => {
  const data = (arg.data ? (arg.data.data ? arg.data.data : arg.data) : arg);
  const edges = data.edges || data;
  const statusCode = +httpStatusCode || +data.status || +data.statusCode || 200;
  return {
    edges,
    message   : message || data.message || +statusCode < 400 ? "success" : "Internal Server Error",
    pageInfo  : data.pageInfo || {
      hasNextPage: false,
      hasPrevPage: false,
      nextCursor : "",
      prevCursor : "",
    },
    totalCount: edges instanceof Array ? edges.length : edges instanceof String || edges instanceof Object ? 1 : 0,
  };
};
