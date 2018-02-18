# schiphol-graphql-api
Let's start with creating a `src` folder to separate our soon to be generated
code from our source code. Go ahead and create it however you like it.

To organize our folder structure, create `types` and `resolvers` folders under `src`
Their name actually giving their purposes away. We're going to keep our GraphQL types and
resolvers under `types` and `resolvers` folders respectively.

We will fill these folders soon enough, but first we need our GraphQL server application to
serve those types from.

Since we will use TypeScript go ahead and create `index.ts` file under `src` folder. This will
contain all of our server logic.

Ok, we said we will create an Express application. To do that we need first import express in
our project. Add the following line to your `index.ts` file

`import * as express from 'express';`

Our responses from our server need to be in JSON format. We need `body-parser` middleware for that

`import * as bodyParser from 'body-parser';`

We will use Apollo's express server middleware to handle the communication between our client and server
applications. We will also use Graphiql middleware. Graphiql is an in-browser query builder and schema
explorer. We will see it in action in our next steps.

`import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';`

There is also another crucial middleware that we need to install at this point. It is `cors`.
Since our client-side and server-side app will be working on different ports, we will use this
middleware to overcome cross-origin request issues.

Add it to your dependencies now:

`npm i -D cors`

Then import it like below:

`import * as cors from 'cors';`

Our final import will be `makeExecutableSchema` from `graphql-tools`. Which is responsible for creating
our schema out of the type that we will provide.

`import { makeExecutableSchema } from 'graphql-tools';`

Our building blocks are in place to create our server. First, we need an express app. Let's create one.

`const app = express();`

That was easy! We need some data to show. For now we can use a static object as our data source

```typescript
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
```

Now we need a schema and resolver to serve with our `graphqlExpress` middleware. You can use the simple
schema below:

```typescript
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
```

Let's create our schema out of these types with the help of `makeExecutableSchema`. I know
we used string to define our schema but hey, one step at a time.

```typescript
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
```

We're almost there. Since our application is called a GraphQL server, it needs some endpoints that
we can expose for the consumers. We will define two endpoints. First one will be the one that will
execute our queries and return the responses. Second one will serve our graphiql app which I
mentioned before.

Our endpoints will use the middlewares provided by Apollo server. And also the `cors` middleware 
will be used on our `/graphql` endpoint

```typescript
app.use('/graphql', bodyParser.json(), cors(), graphqlExpress({ schema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
```

The finishing touch will be to define a port for our server to listen to.

```typescript
app.listen(9999, () => {
  console.log('GraphQL server is running on http://localhost:9999/graphql');
  console.log('To explore your schema, visit http://localhost:9999/graphiql');
});
```

Here we have our simple GraphQL server,ready to use. But, how are we going to run this?
It is written in TypeScript, even though we are not using the types yet, it needs to be 
compiled to JavaScript. Remember that we installed `ts-node`? That will help us to do so.

Open your `package.json` and add the following script.

`"start": "nodemon src/index.ts --watch src --exec ts-node"`

Now run it in your terminal like:

`npm run start`

Visit your graphiql application and have a look around. When you are done you can
go to the next step. 

`git co step-3`
