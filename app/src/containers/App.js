import React, {Component} from 'react';
import { View } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import TabView from '../components/TabView';
import { fetchCards } from '../actions/SwipeActions'
import reducers from '../reducers/AppReducer';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
//const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducers);

export default class App extends Component {
  componentDidMount() {
    store.dispatch(fetchCards(10))
  }
  render() {
    return (
      //<View flex={1}>
        //<Button title="Login" accessibilityLabel="Login" />
      //</View>
      <Provider store={store}><TabView/></Provider>
    );
  }
}
