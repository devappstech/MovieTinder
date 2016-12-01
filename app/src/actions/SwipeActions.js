/*export const REQUEST_CARDS = 'REQUEST_CARDS'

export function requestCards(k) {
  return {
    type: REQUEST_CARDS,
    k
  }
}*/

export const LOAD_CARDS = 'LOAD_CARDS'
export function loadCards(json) {
  return {
    type: LOAD_CARDS,
    cards:json.data
  }
}

export function fetchCards(k) {
  return dispatch => {
    //dispatch(requestCards(k))
    /*return fetch(`http://www.reddit.com/r/kk.json`)
      .then(response => response.json())
      .then(json => dispatch(loadCards(json)))*/
      return dispatch(loadCards(require('./loadCards.json')))
  }
}

/*
REQUEST ADD FILM
*/

export const VOTE_FILM = 'VOTE_FILM'
export function voteFilm() {
  return {
    type: VOTE_FILM
  }
}

export function fetchVoteFilm(film,isYup,userId) {
  return dispatch => {
    //dispatch(requestAddFilm(k))
    /*return fetch(`http://www.reddit.com/r/kk.json`)
      .then(response => response.json())
      .then(json => dispatch(loadCards(json)))*/
      return dispatch(voteFilm())
  }
}
