import { connect } from 'react-redux'
import { fetchFindFilm, resetFindFilm, toggleFriend } from '../actions/FindFilmActions'
import FindFilmView from '../components/FindFilmView'

const mapStateToProps = (state) => {
  return {
    compteur: state.findFilm.compteur,
    isFinding: state.findFilm.isFinding,
    friends: state.findFilm.friends,
    film: state.findFilm.film,
    idUser: state.user.user.id
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    selectFriend: (friend) => {
      dispatch(toggleFriend(friend))
    },
    findFilm: (users,compteur) => {
      dispatch(fetchFindFilm(users,compteur))
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
