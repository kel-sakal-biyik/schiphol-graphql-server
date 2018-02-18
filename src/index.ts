import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

const app = express();

const flightList = [
    {
        "flightName": "HV5804",
        "scheduleDate": "2018-02-07",
    },
    {
        "flightName": "PC1256",
        "scheduleDate": "2018-02-07",
    }
];

const typeDefs = `
  type Query { 
    flights: [Flight] 
  }
  type Flight { 
    flightName: String
    scheduleDate: String 
  }
`;

const resolvers = {
    Query: { flights: () => flightList },
};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

app.use('/graphql', bodyParser.json(), cors(), graphqlExpress({ schema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(9999, () => {
    console.log('GraphQL server is running on http://localhost:9999/graphql');
    console.log('To explore your schema, visit http://localhost:9999/graphiql');
});
