# schiphol-graphql-api
Ok, now it is time for a recap. What did we learn so far?

1. The essential and recommended dependencies
2. How to create the server by using the express and apollo server
3. How to create types and resolvers and load them into our schema
using `merge-graphql-schemas`
4. How to connect our server to a real data source

Here comes your challenge. You will write an Angular application which
will show the today's upcoming flights and their info.

Upcoming flights can be obtained via using `scheduledate` (yyyy-MM-dd) and
`scheduletime` (HH:mm) query parameters in your request.

To feed your front end application you need to provide the necessary information
about the flights. What do you need to show in your app?

* Destination (IATA code, City and Country)
* Scheduled flight time (HH:mm)
* Flight name
* Airline name

You need to create all the required types and resolvers. Use 
your freshly acquired knowledge. 

If you are stuck, just use Raise Hand spell to summon me.

Too shy to ask questions? 

`git co step-6` 
