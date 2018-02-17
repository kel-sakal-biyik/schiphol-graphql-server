/* tslint:disable */

export interface Query {
  flights?: Flight[] | null; 
}

export interface Flight {
  flightName?: string | null; 
  scheduleTime?: string | null; 
  airlineConnection?: Airline | null; 
  destinationConnection?: Destination | null; 
}

export interface Airline {
  iata?: string | null; 
  publicName?: string | null; 
}

export interface Destination {
  iata?: string | null; 
  country?: string | null; 
  city?: string | null; 
}
export interface FlightsQueryArgs {
  scheduleDate?: string | null; 
  scheduleTime?: string | null; 
}
