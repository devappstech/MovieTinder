import Api from '../api/Api'


export const FIND_FILM = 'FIND_FILM'
export function findFilm(movie) {
  return {
    type: FIND_FILM,
    film:movie
  }
}

export function fetchFindFilm(users,nb) {
  return dispatch => {
    Api.findFilm(users,nb).then(function (results) {
      if (results.errors) {
        console.log("api.findfilm() failed");
      }else {
        return dispatch(findFilm(results.data.user_movie[0].movie))
      }
    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error);
    });
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
  return {
    type: TOGGLE_FRIEND,
    friend:friend
  }
}
