import {routerReducer} from 'react-router-redux'
import {combineReducers} from 'redux';
import visible from './settings/visible';
import collection from './trips/collection';
import chapterDates from './trips/new/chapterDates';
import chapterLocations from './trips/new/chapterLocations';
import chapterSummaries from './trips/new/chapterSummaries';
import chapterTabs from './trips/new/chapterTabs';
import selected from './trips/selected';
import tripList from './trips/tripList';
import currentUser from './user/currentUser';

export default combineReducers({
  currentUser,
  settings: combineReducers({
    visible
  }),
  trips: combineReducers({
    tripList,
    collection,
    selected,
    newTrip: combineReducers({
      chapterLocations,
      chapterDates,
      chapterTabs,
      chapterSummaries
    })
  }),
  router: routerReducer
});