export const RECEIVE_AIRPORTS = 'RECEIVE_AIRPORTS';

export default function receiveAirports(airports: Object[]) {
  return {
    type: RECEIVE_AIRPORTS,
    airports
  }
}