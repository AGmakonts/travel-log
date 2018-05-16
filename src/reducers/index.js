import {routerReducer} from 'react-router-redux'
import {combineReducers} from 'redux';
import fieldValue from './settings/connectedAccounts/flickr/fieldValue';
import user from './settings/connectedAccounts/flickr/user';
import visible from './settings/visible';
import collection from './trips/collection';
import chapterDates from './trips/new/chapterDates';
import chapterLocations from './trips/new/chapterLocations';
import chapterSummaries from './trips/new/chapterSummaries';
import chapterTabs from './trips/new/chapterTabs';
import albumList from './trips/new/flickr/albumList';
import photoBrowser from './trips/new/photoBrowser';
import selected from './trips/selected';
import tripList from './trips/tripList';
import currentUser from './user/currentUser';

export default combineReducers({
  currentUser,
  settings: combineReducers({
    visible,
    accounts: combineReducers({
      flickr: combineReducers({
        fieldValue,
        user
      })
    })
  }),
  trips: combineReducers({
    tripList,
    collection,
    selected,
    newTrip: combineReducers({
      flickr: combineReducers({
        albumList
      }),
      photoBrowser,
      chapterLocations,
      chapterDates,
      chapterTabs,
      chapterSummaries
    })
  }),
  router: routerReducer
});