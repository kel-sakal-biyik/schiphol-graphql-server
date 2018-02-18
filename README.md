# schiphol-graphql-api
Pretty quick and easy right? Now we have an actual working GraphQL server.
Yes, it is serving mock data but still. To quickly bootstrap our server we
used string types. Let's change it and create our `.graphql` files.

Let's remember our little schema:

```ecmascript 6
const typeDefs = `
  type Query { 
    flights: [Flight] 
  }
  type Flight { 
    flightName: String
    scheduleDate: String 
  }
`;
```

We need a new type file under our `types` folder. Create `flight.graphql` file under 
`types`. And then, simply copy the types inside the template string and paste them inside
`flight.graphql`. Now you can remove `const typeDefs` from `index.ts`.

Next, we can put our only resolver as a separate file under `resolvers` folder to better
organize and modularize our code.

Take our resolver and its data and put them in a new file called `flight.ts` under
`resolvers` folder like below:

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

export default {
    Query: { 
        flights: () => flightList 
    }
}
```

Now we need to load these files in our `index.ts` file. We will use 
`merge-graphql-schemas` library as a helper. It will recursively traverse
`resolvers` and `types` folders and merge them.

```typescript
import * as path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types'), { recursive: true }));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers'), { recursive: true }));
```

Let's install @types/node package so that TypeScript can recognize node packages and global node variables.

```bash
npm i -D @types/node
```

From now on, whenever you add a new type or resolver under your `types` and `resolvers` 
folders respectively, they will be available in your schema. 

Let's take it further and create TypeScript types out of our schema. Then we can use this in
our resolvers. `graphql-code-generator` will be our tool. It basically introspects our graphql
server and additionally it uses the `.graphql` files to create those. So, that means our server
needs to be running. Let's run it:

`npm run start`

Next add the following `gql-gen` script in our `package.json`

`"gql-gen": "gql-gen --url http://localhost:9999/graphql --template typescript --out ./src/typings/graphql-typings.d.ts ./src/**/*.graphql"`

Cool! We can use it in our resolver now in `flight.ts` under `resolvers`.

```typescript
import { Flight } from '../typings/graphql-typings';

export default {
    Query: { 
        flights: (): Flight => flightList 
    }
}
```

Now we are ready to use a real data source. Continue with the next step.

`git co step-4`
