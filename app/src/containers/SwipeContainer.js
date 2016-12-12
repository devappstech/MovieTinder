import { connect } from 'react-redux'
import { fetchCards, fetchVoteFilm } from '../actions/SwipeActions'
import SwipeView from '../components/SwipeView'

const mapStateToProps = (state) => {
  return {
    cards: state.cards
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    cardRemoved: (index,cardLength) => {
      let CARD_REFRESH_LIMIT = 5
      if (cardLength - index <= CARD_REFRESH_LIMIT + 1) {
        dispatch(fetchCards(10))
      }
    },
    handleVote: (card,isYup,userId) => {
      dispatch(fetchVoteFilm(card,isYup,userId))
    }
  }
}

const SwipeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SwipeView)

export default SwipeContainer
