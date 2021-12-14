
export default function(state=[] , action){
  switch(action.type){
    case 'FETCH_MNTS':
      return action.payload

    default:
      return state
  }
}
