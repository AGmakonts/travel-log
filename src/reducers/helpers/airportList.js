import {RECEIVE_AIRPORTS} from '../../actions/airports/receiveAirports';

export default function airportList(state = [], action) {

  switch (action.type) {

    case RECEIVE_AIRPORTS: {
      return action.airports;
    }

    default:
      return state;
  }

}