import {routerReducer} from 'react-router-redux'
import {combineReducers} from 'redux';
import fieldValue from './settings/connectedAccounts/flickr/fieldValue';
import user from './settings/connectedAccounts/flickr/user';
import visible from './settings/visible';
import collection from './trips/collection';
import chapters from './trips/new/chapters';
import chapterTabs from './trips/new/chapterTabs';
import albumList from './trips/new/flickr/albumList';
import currentSetPhotos from './trips/new/flickr/currentSetPhotos';
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
        albumList,
        currentSetPhotos
      }),
      chapters,
      photoBrowser,
      chapterTabs
    })
  }),
  router: routerReducer
});