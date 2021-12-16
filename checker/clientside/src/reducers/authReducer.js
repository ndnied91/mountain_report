

const INITIAL_STATE={
  name:'',
  selection: [],
}



export default function(state = INITIAL_STATE , action){
  switch(action.type){
    case 'CURRENT_USER':
      return action.payload

    default:
      return state
  }
}
