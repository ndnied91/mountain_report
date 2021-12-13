
import {combineReducers} from 'redux'

import mountainReducer from './mountainReducer'
import moutainSelReducer from './moutainSelReducer'


export default combineReducers({
  mountains: mountainReducer,
  selection: moutainSelReducer
})
