
import {combineReducers} from 'redux'

import mountainReducer from './mountainReducer'


export default combineReducers({
  mountains: mountainReducer
})
