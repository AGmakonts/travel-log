import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux'
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {history, store} from './store';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
