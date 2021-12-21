

export default function search(state = '' , action){

     switch (action.type){
        case 'SEARCH_UPDATE_TERM':
             return action.payload

         default:
          return state;
        }

}
