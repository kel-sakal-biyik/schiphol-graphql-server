# schiphol-graphql-api
To be able to work with a real API we need to work with promises. Luckily,
we have a good request library which returns promises. Add it to your
dependencies with:

`npm i -S request request-promise-native`

Now we will be able to make a request to our API. We will be using Schiphol API
as our data source. Since we already created our flight type lets make a request
to `/flights` endpoint. Check the below link out:

`https://api.schiphol.nl/public-flights/flights?app_id=[APP_ID]&app_key=[APP_KEY]&includedelays=false&page=0&sort=%2Bscheduletime`

This is how we can request data from `/flights` endpoint. As you can see you need
APP_ID and APP_KEY to be able to make a request. You can use the id and the key provided
in the slides for this workshop. If you want to continue on this project afterwards,
you need to create yourself an account and use your own keys.

One more important detail about the Schiphol API is that requests require `RessourceVersion`
in request headers. For our case we will be using `v3`. 

So, how can we make this request using our `request-promise-native` library?

First, we need to import the library in our `flight.ts` file

`import * as request from 'request-promise-native';`

And set the options for our request.

```typescript
const options = {
    uri: 'https://api.schiphol.nl/public-flights/flights',
    qs: {
        app_id: 'XXXXX',
        app_key: 'XXXXX',
        includedelays: false,
        page: 0,
        sort:'+scheduletime'
    },
    headers: {
        'ResourceVersion': 'v3'
    },
    json: true
};
```

Now we can replace our resolver function for for flights field with
our request library. Obviously, we won't need the mock data we used before.
Feel free to delete that one too.

```typescript
export default {
    Query: {
        flights: (): Flight => request(options)
    }
};
```

Let's have a look the response that we expect from this call: 

```json
{
  "flights": [
    {
      "actualLandingTime": "2018-02-12T21:23:54.889Z",
      "actualOffBlockTime": "2018-02-12T21:23:54.889Z",
      "aircraftRegistration": "string",
      "aircraftType": {
        "iatamain": "string",
        "iatasub": "string"
      },
      "baggageClaim": {
        "belts": [
          "string"
        ]
      },
      "checkinAllocations": {
        "checkinAllocations": [
          {
            "endTime": "2018-02-12T21:23:54.889Z",
            "rows": {
              "rows": [
                {
                  "desks": {
                    "desks": [
                      {
                        "checkinClass": {
                          "code": "string",
                          "description": "string"
                        },
                        "position": 0
                      }
                    ]
                  },
                  "position": "string"
                }
              ]
            },
            "startTime": "2018-02-12T21:23:54.889Z"
          }
        ],
        "remarks": {
          "remarks": [
            "string"
          ]
        }
      },
      "codeshares": {
        "codeshares": [
          "string"
        ]
      },
      "estimatedLandingTime": "2018-02-12T21:23:54.889Z",
      "expectedTimeBoarding": "2018-02-12T21:23:54.889Z",
      "expectedTimeGateClosing": "2018-02-12T21:23:54.889Z",
      "expectedTimeGateOpen": "2018-02-12T21:23:54.889Z",
      "expectedTimeOnBelt": "2018-02-12T21:23:54.889Z",
      "flightDirection": "A",
      "flightName": "string",
      "flightNumber": 0,
      "gate": "string",
      "id": "string",
      "mainFlight": "string",
      "prefixIATA": "string",
      "prefixICAO": "string",
      "publicEstimatedOffBlockTime": "2018-02-12T21:23:54.889Z",
      "publicFlightState": {
        "flightStates": [
          "string"
        ]
      },
      "route": {
        "destinations": [
          "string"
        ]
      },
      "scheduleDate": "string",
      "scheduleTime": "string",
      "schemaVersion": "string",
      "serviceType": "SCHEDULED_PASSENGER_SERVICE",
      "terminal": 0,
      "transferPositions": {
        "transferPositions": [
          0
        ]
      }
    }
  ],
  "schemaVersion": "string"
}
```

Wow, that's what I call a "response"! It is easy to notice that the response
has `flights` key. However we need to return its from our resolver. Let's fix 
that.

```typescript
export default {
    Query: {
        flights: (): Flight => request(options).then(data => data.flights)
    }
};
```
 

Cool! Now look at our `Flight` type:

```typescript
type Flight {
    flightName: String
    scheduleDate: String
}
```

`Apparently, we only need `flightName` and `scheduleDate`, and that's what we will get.
Again if you observe our `flights` query, you will see that `flights` field is expecting
an array of `Flight` type.

When we run our query, we need to see something like this:

```
[
  {
      "flightName": "string",
      "scheduleDate": "string"
  },
  {
      "flightName": "string",
      "scheduleDate": "string"
  },
  .
  .
  .
]
``` 

Open your graphiql app and give it a try.

If you got a similar response, well done! You can proceed with the next step.

`git co step-5`
