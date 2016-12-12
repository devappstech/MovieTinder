import Api from '../api/Api'
import {increaseUserCount} from './LoginActions'

export const LOAD_CARDS = 'LOAD_CARDS'
export function loadCards(movies) {
  return {
    type: LOAD_CARDS,
    cards:movies
  }
}

export const RESET_CARDS = 'RESET_CARDS'
export function resetCards() {
  return {
    type: RESET_CARDS
  }
}

export function fetchCards(offset, limit) {
  return dispatch => {
    Api.getMovies(offset,limit).then(function (results) {
      dispatch(increaseUserCount())
      return dispatch(loadCards(results.data.movies))
    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error);
    });
  }
}

export function fetchVoteFilm(userId,filmId,isYup) {
  return dispatch => {
    Api.addMovieToUser(userId,filmId,isYup).then(function (results) {
      //do nothing
    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error);
    });
  }
}
