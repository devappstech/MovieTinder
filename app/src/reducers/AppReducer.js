import { combineReducers } from 'redux';
import cards from './SwipeReducer'
import user from './LoginReducer'
import findFilm from './FindFilmReducer'

const AppReducer = combineReducers({
  cards,
  user,
  findFilm
})

export default AppReducer
