
import {combineReducers} from 'redux'

import mountainReducer from './mountainReducer'
import moutainSelReducer from './moutainSelReducer'

import authReducer from './authReducer'


export default combineReducers({
  mountains: mountainReducer,
  selection: moutainSelReducer,
  user: authReducer
})
