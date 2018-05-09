export default function collection(state = [], action) {

  switch (action.type) {
    case 'TRIP_ADDED':
      return [...state, action.payload];
    default:
      return state;
  }
}