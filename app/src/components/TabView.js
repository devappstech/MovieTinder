import React, { PropTypes, Component } from 'react';

import SwipeContainer from '../containers/SwipeContainer';
import ProfilView from './ProfilView';
import FindFilmView from './FindFilmView';

var ScrollableTabView = require('react-native-scrollable-tab-view');

export default class tabView extends Component {
  render() {
    return (
      <ScrollableTabView locked={true}>
        <ProfilView tabLabel="Profil"/>
        <SwipeContainer tabLabel="Vote"/>
        <FindFilmView tabLabel="Film"/>
      </ScrollableTabView>
    );
  }
}
