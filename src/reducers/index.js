import {routerReducer} from 'react-router-redux'
import {combineReducers} from 'redux';
import collection from './trips/collection';
import selected from './trips/selected';
import tripList from './trips/tripList';

export default combineReducers({
  trips: combineReducers({
    tripList,
    collection,
    selected,
    router: routerReducer
  })
});