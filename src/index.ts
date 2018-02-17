import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import * as path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types'), { recursive: true }));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers'), { recursive: true }));

const app = express();

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

app.use('/graphql', bodyParser.json(), cors(), graphqlExpress({ schema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(9999, () => {
    console.log('GraphQL server is running on http://localhost:9999/graphql');
    console.log('To explore your schema, visit http://localhost:9999/grapihql');
});
