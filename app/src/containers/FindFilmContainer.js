import { connect } from 'react-redux'
import { fetchFindFilm, resetFindFilm, toggleFriend } from '../actions/FindFilmActions'
import FindFilmView from '../components/FindFilmView'

const mapStateToProps = (state) => {
  return {
    compteur: state.findFilm.compteur,
    isFinding: state.findFilm.isFinding,
    friends: state.findFilm.friends,
    film: state.findFilm.film
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    selectFriend: (friend) => {
      dispatch(toggleFriend(friend))
    },
    findFilm: (user,compteur) => {
      dispatch(fetchFindFilm(user,compteur))
    },
    resetFindFilm: () => {
      dispatch(resetFindFilm())
    }
  }
}

const FindFilmContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FindFilmView)

export default FindFilmContainer
