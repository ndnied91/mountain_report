// const removeElements = (arr,n)=> {
//   console.log(arr)
//   console.log(n)
//     let mp = new Map();
//     let ret = []
//
//     for (let i = 0; i < n; ++i) {
//         mp.set(arr[i],mp.get(arr[i]) == null?1:mp.get(arr[i])+1);
//     }
//
//     console.log('map' , mp)
//     for (let i = 0; i < n; ++i) {
//         if (mp.has(arr[i]) && mp.get(arr[i]) % 2!==0 &&  ret.indexOf(arr[i]) < 0) {
//             ret.push(arr[i])
//         }
//     }
//     console.log('ret' , ret)
//     return {selection: ret }
// }
//
//
//
//
// const initialState = { selection:[] }
//
// export default function mntSel(state = initialState , action){
//
//      switch (action.type){
//        case 'ADD_ITEM':
//          let vals = {  ...state,  selection: [...state.selection, action.payload] }
//           return removeElements(vals.selection,vals.selection.length)
//
//
//       case 'ADD_LIST':
//            return {  ...state,  selection: [...state.selection, ...action.payload] }
//       //
//       // case 'RESET_LIST':
//       //      return {  ...state,  selection: [] }
//
//          default:
//           return state;
//         }
// }


const removeElements = (arr,n)=> {
  console.log(arr)
    let mp = new Map();
    let ret = []
    //
    for (let i = 0; i < n; ++i) {
        mp.set(arr[i],mp.get(arr[i]) == null?1:mp.get(arr[i])+1);
    }

    for (let i = 0; i < n; ++i) {
        if (mp.has(arr[i]) && mp.get(arr[i]) % 2!==0 &&  ret.indexOf(arr[i]) < 0) {
            ret.push(arr[i])
        }
    }
    console.log('ret after filtering' ,ret)
    return {selection: ret }
}




const initialState = { selection:[] }

export default function (state = initialState , action){

     switch (action.type){
       case 'ADD_ITEM':
       console.log(action.payload)
         let vals = {  ...state,  selection: [...state.selection, action.payload] }
          return removeElements(vals.selection,vals.selection.length)

      case 'ADD_LIST':
           return {  ...state,  selection: [...state.selection, ...action.payload] }

      case 'RESET_LIST':
          return {  ...state,  selection: [] }

         default:
          return state;
        }

        //this updates the list based on the current list

}
