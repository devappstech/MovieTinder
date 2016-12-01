import { createStore, applyMiddleware, combineReducers } from 'redux';

function swipe(state = []
, action) {
  switch (action.type) {
    case 'LOAD_CARDS':
      return state.slice(4).concat(action.cards)
    default:
      return state
  }
}

export default swipe
