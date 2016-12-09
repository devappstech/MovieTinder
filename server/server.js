import Express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from './schema';

const GRAPHQL_PORT = 8889;

const graphQLServer = Express();

graphQLServer.use('/graphql', GraphHTTP({
  graphiql: true,
  pretty: true,
  schema: Schema,
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));
