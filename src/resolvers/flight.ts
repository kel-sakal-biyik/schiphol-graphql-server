import * as request from 'request-promise-native';
import { Flight } from '../typings/graphql-typings';

const options = {
    uri: 'https://api.schiphol.nl/public-flights/flights',
    qs: {
        app_id: 'xxxxx',
        app_key: 'xxxxx',
        includedelays: false,
        page: 0,
        sort:'+scheduletime'
    },
    headers: {
        'ResourceVersion': 'v3'
    },
    json: true
};

export default {
    Query: {
        flights: (): Flight[] => request(options).then(data => data.flights)
    }
};
