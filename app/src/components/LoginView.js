import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import LoginButtonView from './LoginButtonView'
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');


const LoginView = ({ login }) => (
      <View style={{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    }}>
        <FBLogin
    buttonView={<LoginButtonView/>}
    ref={(fbLogin) => { this.fbLogin = fbLogin }}
    loginBehavior={FBLoginManager.LoginBehaviors.Native}
    permissions={["email","user_friends"]}
    onLogin={function(e){login(e.credentials.token);console.log(e)}}
    onLoginFound={function(e){login(e.credentials.token)}}
    onLoginNotFound={function(e){console.log(e)}}
    onLogout={function(e){console.log(e)}}
    onCancel={function(e){console.log(e)}}
    onPermissionsMissing={function(e){console.log(e)}}
  />
      </View>
    )

LoginView.propTypes = {
      login: PropTypes.func.isRequired
}

export default LoginView
