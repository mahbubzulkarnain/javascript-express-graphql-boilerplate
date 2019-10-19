export default `
directive @upper on FIELD_DEFINITION

type PageInfo {
  hasNextPage: Boolean!
  hasPrevPage: Boolean!
  nextCursor: String
  prevCursor: String
}

type PropertyDefaultInput {
  obj: String
  args: String
  context: String
  info: String
}

type PingResponse {
  edges: PropertyDefaultInput
  message: String @upper
  pageInfo: PageInfo
  totalCount: Int
}

type Query {
  ping: PingResponse
}
type Mutation {
  ping: PingResponse
}
`;
