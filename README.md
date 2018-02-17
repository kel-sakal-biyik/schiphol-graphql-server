# schiphol-graphql-api
Before we start to build our server, we have a bit more preparations to do. After these
our local environment will be ready.

First, we will install TypeScript. It is a superset of JavaScript which allows us to use
types. Since GraphQL is type-safe why won't our code be type-safe as well?

Go ahead and add TypeScript to our dependencies:

`npm i -D typescript` or `npm install --save-dev typescript` to be verbose.

You might already noticed `.tsconfig.json` file under our root folder. This configures the 
TypeScript compiler. You don't need to worry about this one. If you want to know more about it
you can visit [here](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

Next, we need ts-node package to be able to execute TypeScript code in node environment. I will
show you how to use this in coming steps. For now, just add it to your dependencies.

`npm i -D ts-node`  

Although, `graphql-tools` allows us to use GraphQL schema language and create our types
using strings, there is a better way to define our types and schema: Using `.graphql` files.
To be able to work with them add `merge-graphql-schemas` to your dependencies.

`npm i -S merge-graphql-schemas`

This relieves us from the burden of concatenating our types to provide them together to our
executable schema generator. Additionally, `.graphql` files are recognized by the IDE plugins
and allows us to navigate through our schema. WebStorm and VSCode have plugins for GraphQL.

Here are the links for the plugins. I strongly recommend you to install them:

- [WebStorm Plugin](https://plugins.jetbrains.com/plugin/8097-js-graphql) 
- [VSCode Plugin](https://github.com/kumarharsh/graphql-for-vscode)

Last but not least, `graphql-codegen` will help us to automatically generate TypeScript types
for both our server and client side applications. Add it to your dev dependencies.

`npm i graphql-code-generator`

Cool, now we are ready to start building our application! Proceed with the next step.

`git checkout step-2`

**_TIP:_** _You can use the following command to add an alias for `git checkout <branch>` to shorten it like 
`git co <branch>` We all like to type less :)_

`git config --global alias.co checkout`
