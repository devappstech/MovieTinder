import React, { PropTypes, Component } from 'react';

import SwipeContainer from '../containers/SwipeContainer';
import ProfilContainer from '../containers/ProfilContainer';
import FindFilmContainer from '../containers/FindFilmContainer';

var ScrollableTabView = require('react-native-scrollable-tab-view');

export default class tabView extends Component {
  render() {
    return (
      <ScrollableTabView locked={true}>
        <ProfilContainer tabLabel="Profil"/>
        <SwipeContainer tabLabel="Vote"/>
        <FindFilmContainer tabLabel="Film"/>
      </ScrollableTabView>
    );
  }
}
