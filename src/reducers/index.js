import {combineReducers} from 'redux';
import tripList from './trips/tripList';
import collection from './trips/collection';
import selected from './trips/selected';

export default combineReducers({
  trips: combineReducers({
    tripList,
    collection,
    selected
  })
});