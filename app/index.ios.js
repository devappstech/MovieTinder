import React, { PropTypes, Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Tinder from './Tinder.js';
import api from './api/api.js';

var {FBLogin, FBLoginManager} = require('react-native-facebook-login');

class Login extends Component {
  render() {
    return (
      <FBLogin />
    );
  }
};

class cards extends Component {
  constructor(props){
    super(props);
    this.state = {
      movies: []
    }
  }

  componentWillMount(){
    api.getMovies().then((res)=>{
      this.setState({
        movies: res.movies
      })
    });
  }
  
  render() {
    console.log(this.state.movies);
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
