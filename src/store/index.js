import {createClient} from '@google/maps/lib/index';
import createHistory from 'history/createBrowserHistory'
import {routerMiddleware} from 'react-router-redux'
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger'
import {createLoader, createMiddleware} from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import apiMiddleware from '../middleware/api/apiMiddleware';
import Authentication from '../middleware/api/firebase/Authentication';
import SettingsWriter from '../middleware/api/firebase/SettingsWriter';
import User from '../middleware/api/flickr/User';
import ReverseGeocoder from '../middleware/api/google/ReverseGeocoder';
import rootReducer from '../reducers/index';


const engine = createEngine('tripList-log-state');
const history = createHistory();
const apiServices = [
  new ReverseGeocoder(createClient({key: 'AIzaSyCekIreelGUg_VydHTlm6mJnv6YV6Y70I8'})),
  new Authentication(),
  new SettingsWriter(),
  new User('5ef695553e6a392c843cd544d4738967')
];

const middleware = [
  createMiddleware(engine),
  routerMiddleware(history),
  apiMiddleware(apiServices),
  logger
];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

const load = createLoader(engine);
load(store);

export {store, history};