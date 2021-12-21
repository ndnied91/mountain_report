
import Cookies from 'js-cookie'

const INITIAL_STATE={
  user: null,
  selection: [],
  id: Cookies.get('user'),
  error: null
}

export default function auth(state = INITIAL_STATE , action){
  switch(action.type){
    case 'CURRENT_USER':
      return action.payload

    default:
      return state
  }
}
