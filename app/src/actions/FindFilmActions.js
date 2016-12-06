
export const FIND_FILM = 'FIND_FILM'
export function findFilm(json) {
  return {
    type: FIND_FILM,
    film:json.film
  }
}

export function fetchFindFilm(users,nb) {
  return dispatch => {
      return dispatch(findFilm(require('./loadFilm.json')))
  }
}

export const RESET_FIND_FILM = 'RESET_FIND_FILM'
export function resetFindFilm() {
  return {
    type: RESET_FIND_FILM
  }
}


export const ADD_FRIENDS = 'ADD_FRIENDS'
export function addFriends(friends) {
  return {
    type: ADD_FRIENDS,
    friends:friends
  }
}


export const TOGGLE_FRIEND = 'TOGGLE_FRIEND'
export function toggleFriend(friend) {
  //console.log(friend);
  return {
    type: TOGGLE_FRIEND,
    friend:friend
  }
}
