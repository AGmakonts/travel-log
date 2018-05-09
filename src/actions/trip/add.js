import Trip from '../../models/Trip';

function addTrip(trip: Trip) {
  return {
    type: 'TRIP_ADDED',
    payload: trip
  }
}

export default addTrip;