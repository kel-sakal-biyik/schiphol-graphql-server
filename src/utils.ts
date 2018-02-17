import * as request from 'request-promise-native';

const API_ROOT = 'https://api.schiphol.nl/public-flights';
const APP_ID = 'xxxxx';
const APP_KEY = 'xxxxx';

export function getFlights(scheduleDate = '', scheduleTime = '') {
    const requestOptions = {
        uri: `${API_ROOT}/flights`,
        qs: {
            app_id: APP_ID,
            app_key: APP_KEY,
            includedelays: false,
            page: 0,
            sort: '+scheduletime',
            scheduledate: scheduleDate,
            scheduletime: scheduleTime
        },
        headers: {
            'ResourceVersion': 'v3'
        },
        json: true
    };

    return request(requestOptions).then(data => data.flights)
}

export function getAirline(prefixIATA: string) {
    const requestOptions = {
        uri: `${API_ROOT}/airlines/${prefixIATA}`,
        qs: {
            app_id: APP_ID,
            app_key: APP_KEY
        },
        headers: {
            'ResourceVersion': 'v1'
        },
        json: true
    };

    return request(requestOptions);
}

export function getDestination(IATA: string) {
    const requestOptions = {
        uri: `${API_ROOT}/destinations/${IATA}`,
        qs: {
            app_id: APP_ID,
            app_key: APP_KEY
        },
        headers: {
            'ResourceVersion': 'v1'
        },
        json: true
    };

    return request(requestOptions);
}
