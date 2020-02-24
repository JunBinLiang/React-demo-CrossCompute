import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from "react-router-dom";
import App from './components/app';
import reducers from './reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
const createStoreWithMiddleware = applyMiddleware()(createStore);

/*ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));*/

ReactDOM.render(
  <BrowserRouter>
	   <Provider store={createStoreWithMiddleware(reducers)}>
		<App />
	  </Provider>
  </BrowserRouter>,
  document.querySelector('#root')
);
