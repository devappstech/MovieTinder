'use strict';

import React from 'react';

import {StyleSheet, Text, View, Image} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

import api from './api/api.js';

const if_fb = 7;
const limit = 10;
const offset = 0;

let Card = React.createClass({
  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Image style={styles.img} source={{uri: this.props.img}} />
      </View>
    )
  }
})

let NoMoreCards = React.createClass({
  render() {
    return (
      <View style={styles.noMoreMovie}>
        <Text>No more Movie</Text>
      </View>
    )
  }
})

const Cards = api.getMovies(offset,limit).then(res => {return res;})

export default React.createClass({
  getInitialState() {
    return {
      cards: Cards,
      outOfCards: false
    }
  },
  handleYup (card) {
    api.addMovieToUser(id_fb,card.id);
  },
  handleNope (card) {
  },
  cardRemoved (index) {
    let CARD_REFRESH_LIMIT = 3
    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      if (!this.state.outOfCards) {
        offset += limit;
        this.setState({
          cards: this.state.cards.concat(api.getMovies(offset,limit).then(res => {return res;})),
          outOfCards: false
        })
      }
    //TODO cas ou le getMovies arrive à sa fin

    }

  },
  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        loop={false}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved}
      />
    )
  }
})

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
    height: 500,
  },
  img: {
    flex: 1,
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  description: {
    fontSize: 10
  },
  noMoreMovie: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
