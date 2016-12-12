import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { fetchCards } from '../actions/SwipeActions'
import { fetchLogUser } from '../actions/LoginActions'
import { fetchFriends } from '../actions/FindFilmActions'
import reducers from '../reducers/AppReducer';
import AppContainer from './AppContainer';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );
  }
}

export default App
