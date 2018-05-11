import {routerReducer} from 'react-router-redux'
import {combineReducers} from 'redux';
import collection from './trips/collection';
import chapterDates from './trips/new/chapterDates';
import chapterLocations from './trips/new/chapterLocations';
import chapterSummaries from './trips/new/chapterSummaries';
import chapterTabs from './trips/new/chapterTabs';
import selected from './trips/selected';
import tripList from './trips/tripList';

export default combineReducers({
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