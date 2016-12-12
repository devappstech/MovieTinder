import ApiFB from '../api/ApiFB'
import {addFriends} from './FindFilmActions'

export const GET_PROFIL_FROM_FB = 'GET_PROFIL_FROM_FB'
export function getProfilFromFb(user) {
  return {
    type: GET_PROFIL_FROM_FB,
    user:user
  }
}

export const LOG_USER = 'LOG_USER'
export function logUser(json) {
  return {
    type: LOG_USER,
    user:json.user
  }
}

export function fetchLogUser(token) {
  return dispatch => {
    ApiFB.getInfosUserFb(token).then(json => {
      dispatch(addFriends(json.friends.data))
      dispatch(getProfilFromFb(json))
      return dispatch(logUser(require('./loadUser.json')))
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
