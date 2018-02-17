/* tslint:disable */

export interface Query {
  flights?: Flight[] | null; 
}

export interface Flight {
  flightName?: string | null; 
  scheduleDate?: string | null; 
}
