import ApiFB from '../api/ApiFB'
import Api from '../api/Api'
import {addFriends} from './FindFilmActions'
import {fetchCards} from './SwipeActions'

export const GET_PROFIL_FROM_FB = 'GET_PROFIL_FROM_FB'
export function getProfilFromFb(user) {
  return {
    type: GET_PROFIL_FROM_FB,
    user:user
  }
}

export const LOG_USER = 'LOG_USER'
export function logUser(user) {
  return {
    type: LOG_USER,
    user:user
  }
}



export function fetchLogUser(token) {
  return dispatch => {
    ApiFB.getInfosUserFb(token).then(json => {
      dispatch(addFriends(json.friends.data))
      dispatch(getProfilFromFb(json))
      Api.getUser(json.id).then(function (results) {
        if (results.errors) {
          console.log("api.getUser() failed");
        }else {
          dispatch(logUser(results.data.user));
          return dispatch(fetchCards(results.data.user.count,10))
        }
      }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error);
      });

    })
      .catch(error => console.log(error));
  }

}


export const LOGOUT_USER = 'LOGOUT_USER'
export function logoutUser() {
  return {
    type: LOGOUT_USER
  }
}


export const INCREASE_USER_COUNT = 'INCREASE_USER_COUNT'
export function increaseUserCount() {
  return {
    type: INCREASE_USER_COUNT
  }
}
