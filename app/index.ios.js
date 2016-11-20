import React, { PropTypes, Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Tinder from './Tinder.js';

class cards extends Component {
  render() {
    return (
      <Tinder style={{flex: 1}} />
    );
  }
};

export default class app extends Component {
  render() {
    return (
      <View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('app', () => cards);
