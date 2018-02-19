import { getAirline, getDestination, getFlights } from '../utils';
import { Airline, Flight, Destination, FlightsQueryArgs } from '../typings/graphql-typings';

export default {
    Query: {
        flights: (_, args: FlightsQueryArgs): Flight[] =>
            getFlights(args.scheduleDate, args.scheduleTime).catch(err => console.log('API ERROR:', err.message))
    },
    Flight: {
        scheduleTime: (data) => {
            return data.scheduleTime.match(/\d{2}:\d{2}/)[0];
        },
        airlineConnection: (data): Airline => {
            return data.prefixIATA
                ? getAirline(data.prefixIATA).catch(err => console.log('API ERROR:', err.message))
                : null;
        },
        destinationConnection: (data): Destination =>
            getDestination(data.route.destinations.slice(-1)).catch(err => console.log('API ERROR:', err.message))
    }
};
