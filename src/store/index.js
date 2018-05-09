import createHistory from 'history/createBrowserHistory'
import {routerMiddleware} from 'react-router-redux'
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger'
import {createLoader, createMiddleware} from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import rootReducer from '../reducers/index';


const engine = createEngine('tripList-log-state');
const history = createHistory();

const middleware = [
  createMiddleware(engine),
  routerMiddleware(history),
  logger
];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

const load = createLoader(engine);
load(store);

export {store, history};