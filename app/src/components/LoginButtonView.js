import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');

class LoginButtonView extends Component {
  static contextTypes = {
    isLoggedIn: React.PropTypes.bool,
    login: React.PropTypes.func,
    logout: React.PropTypes.func,
    props: React.PropTypes.object
    };
  constructor(props) {
      super(props);
    }
    render(){
        return (
          <View style={{width:150, flex:0, alignSelf:'center'}}>
            <Button
              onPress={() => {(!this.context.isLoggedIn)?this.context.login():this.context.logout()} }
              color={"#3b5998"}
              backgroundColor={"#3b5998"} title={!this.context.isLoggedIn?"Login":"Logout"} size={20} width={150} borderRadius={100} />
          </View>
      )
    }
}
export default LoginButtonView
