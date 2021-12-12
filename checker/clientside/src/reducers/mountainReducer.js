
export default function(state=[] , action){
  switch(action.type){
    case 'FETCH_ALL_MNTS':
      return action.payload

    default:
      return state
  }
}
