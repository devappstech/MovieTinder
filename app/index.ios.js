import React, { PropTypes, Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
} from 'react-native';

import MyScene from './MyScene.js';

export default class app extends Component {
  render() {
  const routes = [
    {title: 'Profil', index: 0},
    {title: 'Home', index: 1},
    {title: 'List', index: 2},
  ];
  return (
    <Navigator
      initialRoute={routes[1]}
      initialRouteStack={routes}
      renderScene={(route, navigator) =>
          <MyScene/>
      }
      navigationBar={
       <Navigator.NavigationBar
         routeMapper={{
           LeftButton: (route, navigator, index, navState) =>
             {
               if (route.index === 0) {
                     return null;
                   } else {
                     return (
                       <TouchableHighlight onPress={() => navigator.pop()}>
                         <Text>Profil</Text>
                       </TouchableHighlight>
                     );
              }

             },
           RightButton: (route, navigator, index, navState) =>
             {
               if (route.index === 2) {
                     return null;
                   } else {
                     return (
                       <TouchableHighlight onPress={() => navigator.push(routes[index+1])}>
                         <Text>List</Text>
                       </TouchableHighlight>
                     );
              }
             },
           Title: (route, navigator, index, navState) =>
             { if (route.index === 0) {
                return (<Text>Profil</Text>);
              }
              else if (route.index === 1) {
                return (<Text>Home</Text>);
              }
              else{
                return (<Text>List</Text>);
              }
             },
         }}
         style={{backgroundColor: 'gray'}}
       />
      }
      style={{paddingTop: 100}}

    />
  );
}
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('app', () => app);
