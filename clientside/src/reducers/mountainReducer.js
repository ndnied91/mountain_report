
export default function mnt(state=[] , action){
  switch(action.type){
    case 'FETCH_MNTS':
      return action.payload

    default:
      return state
  }
}
