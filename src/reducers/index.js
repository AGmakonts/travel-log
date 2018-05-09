import {combineReducers} from 'redux';
import tripList from './trips/tripList';
import collection from './trips/collection';

export default combineReducers({
  trips: combineReducers({
    tripList,
    collection
  })
});