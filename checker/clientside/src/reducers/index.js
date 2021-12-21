
import {combineReducers} from 'redux'

import mountainReducer from './mountainReducer'
import moutainSelReducer from './moutainSelReducer'

import searchReducer from './searchReducer'

import authReducer from './authReducer'


export default combineReducers({
  mountains: mountainReducer,
  selection: moutainSelReducer,
  searchResults: searchReducer,
  user: authReducer
})
