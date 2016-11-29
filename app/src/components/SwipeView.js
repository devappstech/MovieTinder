import React, { PropTypes, Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

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
      <View style={styles.noMoreCards}>
        <Text>No more Movie</Text>
      </View>
    )
  }
})

const SwipeView = ({ cards, handleVote, cardRemoved }) => (
  <SwipeCards
    cards={cards}
    loop={false}

    renderCard={(cardData) => <Card {...cardData} />}
    renderNoMoreCards={() => <NoMoreCards />}
    showYup={true}
    showNope={true}

    handleYup={(card) => {handleVote(card,true)}}
    handleNope={(card) => handleVote(card,false)}
    cardRemoved={(index) => cardRemoved(index,cards.length)}
  />
)

SwipeView.propTypes = {
  cards: PropTypes.array.isRequired,
  handleVote: PropTypes.func.isRequired,
  cardRemoved: PropTypes.func.isRequired
}

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
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default SwipeView
