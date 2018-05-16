import createHistory from 'history/createBrowserHistory'
import {routerMiddleware} from 'react-router-redux'
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger'
import {createLoader, createMiddleware} from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import thunk from 'redux-thunk';
import apiMiddleware from '../middleware/api/apiMiddleware';
import Authentication from '../middleware/api/firebase/Authentication';
import rootReducer from '../reducers/index';


const engine = createEngine('tripList-log-state');
const history = createHistory();
const apiServices = [
  new Authentication(),
]

const middleware = [
  thunk,
  createMiddleware(engine),
  routerMiddleware(history),
  apiMiddleware(apiServices),
  logger
];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

const load = createLoader(engine);
load(store);


export {store, history};