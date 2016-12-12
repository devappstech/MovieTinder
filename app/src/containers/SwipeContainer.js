import { connect } from 'react-redux'
import { fetchCards, fetchVoteFilm } from '../actions/SwipeActions'
import SwipeView from '../components/SwipeView'

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
    userId : state.user.user.id,
    compteur : state.user.user.compteur
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    cardRemoved: (index,cards,compteur) => {
      var cardLength = cards.length;
      let CARD_REFRESH_LIMIT = 5
      if (cardLength - index <= CARD_REFRESH_LIMIT + 1) {
        dispatch(fetchCards((compteur),10))
      }
    },
    handleVote: (userId,card,isYup) => {
      dispatch(fetchVoteFilm(userId,card.id,isYup))
    }
  }
}

const SwipeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SwipeView)

export default SwipeContainer
