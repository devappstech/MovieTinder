import React, { PropTypes, Component } from 'react';
import TabView from './TabView';
import LoginContainer from '../containers/LoginContainer';

const AppView = ({ isLogged }) => (
  isLogged ? <TabView/> : <LoginContainer/>
)

AppView.propTypes = {
  isLogged: PropTypes.bool.isRequired
}

export default AppView
