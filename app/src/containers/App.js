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
  componentDidMount() {
    store.dispatch(fetchCards(10))
    //store.dispatch(fetchLogUser(10))
  }
  render() {
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );
  }
}

export default App
