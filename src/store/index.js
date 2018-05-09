import {applyMiddleware, createStore} from 'redux';
import rootReducer from '../reducers/index';
import {composeWithDevTools} from 'redux-devtools-extension';
import createEngine from 'redux-storage-engine-localstorage';
import {createLoader, createMiddleware} from 'redux-storage';
import logger from 'redux-logger'

const engine = createEngine('tripList-log-state');
const storage = createMiddleware(engine);

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(storage, logger)));

const load = createLoader(engine);
load(store);

export default store;