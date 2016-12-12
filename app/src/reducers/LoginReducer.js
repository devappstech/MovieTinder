function user(state = { isLogged : false, user : {} }
, action) {
  switch (action.type) {
    case 'GET_PROFIL_FROM_FB':
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          id: action.user.id,
          name: action.user.name,
          picture: action.user.picture.data.url
        })
      })
    case 'LOG_USER':
      return Object.assign({}, state, {
        isLogged: true,
        user: Object.assign({}, state.user, {
          compteur: action.user.count
        })
      })
    case 'LOGOUT_USER':
      return Object.assign({}, state, {
        isLogged: false,
        user: {}
      })
    case 'INCREASE_USER_COUNT':
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          compteur: state.user.compteur+10
        })
      })
    default:
      return state
  }
}

export default user
