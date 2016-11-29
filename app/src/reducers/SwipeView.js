import { createStore, applyMiddleware, combineReducers } from 'redux';

function cards(state = []
, action) {
  switch (action.type) {
    case 'LOAD_CARDS':
      return state.slice(4).concat(action.cards)
    default:
      return state
  }
}

const swipeApp = combineReducers({
  cards
})

export default swipeApp
