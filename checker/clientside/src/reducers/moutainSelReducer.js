const removeElements = (arr,n)=> {
    let mp = new Map();
    let ret = []

    for (let i = 0; i < n; ++i) {
        mp.set(arr[i],mp.get(arr[i]) == null?1:mp.get(arr[i])+1);
    }

    for (let i = 0; i < n; ++i) {
        if (mp.has(arr[i]) && mp.get(arr[i]) % 2!==0 &&  ret.indexOf(arr[i]) < 0) {
            ret.push(arr[i])
        }
    }
    return {selection: ret }
}




const initialState = { selection:[] }

export default function (state = initialState , action){

console.log(action.payload)

     switch (action.type){
       case 'ADD_ITEM':
         let vals = {  ...state,  selection: [...state.selection, action.payload] }
          return removeElements(vals.selection,vals.selection.length)

      case 'ADD_LIST':
       return {  ...state,  selection: [...state.selection, ...action.payload] }
          // return state

         default:
          return state;
        }

        //this updates the list based on the current list 

}
