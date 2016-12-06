import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from 'react-native';
import LoginButtonView from './LoginButtonView'
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');

const ProfilView = ({ logout, user }) => (
  <View flex={1}>
    <Text style={{alignSelf:'center', padding:20, marginTop:100}}>{user.name}</Text>
    <Image
      style={{width: 50, height: 50, borderRadius:25, alignSelf:'center', padding:20, marginBottom:50}}
      source={{uri: user.picture}}
    />
    <FBLogin
      buttonView={<LoginButtonView />}
      ref={(fbLogin) => { this.fbLogin = fbLogin }}
      loginBehavior={FBLoginManager.LoginBehaviors.Native}
      permissions={["email","user_friends"]}
      onLogin={function(e){console.log(e)}}
      onLoginFound={function(e){console.log(e)}}
      onLoginNotFound={function(e){console.log(e)}}
      onLogout={function(e){logout();console.log(e)}}
      onCancel={function(e){console.log(e)}}
      onPermissionsMissing={function(e){console.log(e)}}
    />
  </View>
)

ProfilView.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default ProfilView
