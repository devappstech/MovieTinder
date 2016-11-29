import React, {Component} from 'react';
import {
  Text,
  View
} from 'react-native';
import TabView from '../components/TabView';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { fetchCards } from '../actions/SwipeView'
import reducers from '../reducers/SwipeView';
//import CounterApp from './counterApp';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
//const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducers);

export default class App extends Component {
  componentDidMount() {
    store.dispatch(fetchCards(0))
  }
  render() {
    return (
      //
      //<View flex={1}>
        //<Button title="Login" accessibilityLabel="Login" />
      //</View>
      <View flex={1}><Provider store={store}><TabView/></Provider></View>

      //</Provider>
    );
  }
}
