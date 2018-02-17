import { Flight } from '../typings/graphql-typings';

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
        flights: (): Flight => flightList
    }
};
