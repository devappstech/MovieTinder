function removeElemFromArray(arr,elem){
  arr.splice(arr.indexOf(elem),1);
  return arr;
}

function findFilm(state = { isFinding : false, compteur : 0, friends : [], film : {} }
, action) {
  switch (action.type) {
    case 'ADD_FRIENDS':
      return Object.assign({}, state, {
        friends: action.friends
        //.map((f)=>Object.assign({}, f, {selected: false}))
      })
    case 'FIND_FILM':
      return Object.assign({}, state, {
        isFinding: true,
        film: action.film,
        compteur: state.compteur+1
      })
    case 'RESET_FIND_FILM':
      return Object.assign({}, state, {
        isFinding: false,
        film: {},
        compteur: 0
      })
    case 'TOGGLE_FRIEND':
      return Object.assign({}, state, {
        friends: state.friends.map((f)=>(f.name===action.friend.name)?Object.assign({},f,{selected:!f.selected}):f)
      })
    default:
      return state
  }
}

export default findFilm
