import axios from 'axios'
import Cookies from 'js-cookie'

export const fetchAllMountains = () => async dispatch => {
  const res = await axios.get(`/api/mountains`)
   dispatch({ type: 'FETCH_MNTS' , payload: res.data})
}



export const fetchSelectedMountains = (values, id ) => async dispatch => {
  const res = await axios.post('/api/mountains', ({values, id}))
  dispatch({ type: 'FETCH_MNTS' , payload: res.data})
}




export const  moutainSelections= (selection) =>{
  return ({ type: 'ADD_ITEM' , payload : selection })
}

///THIS IS UPDATED

export const  resetSelection= () =>{
  console.log('cleaning...')
    return ({ type: 'RESET_LIST' , payload : [] })
}



///THIS IS UPDATED
export const  moutainUpdate= (selection) =>{
  console.log('current list')
  console.log(selection)
    return ({ type: 'ADD_LIST' , payload : selection })
}





export const verifyUser = (values) => async dispatch => {
  let vals = {username: values.username.value, password: values.password.value}
    const res = await axios.post('/api/login', vals)
    console.log('res from verify User' ,res)
    dispatch({ type: 'CURRENT_USER' , payload: res.data})

    if(!res.data.error){
        Cookies.set('user' , res.data.id)
        return true
    }
    else{
      return false
    }

}

export const saveUser = (values, selection) => async dispatch => {
  console.log('saving user now..')
  console.log(selection)
  let vals = {username: values.username.value, password: values.password.value , selection: selection}
    const res = await axios.post('/api/user', vals)
    console.log('SAVE USER FIRING', res)
    dispatch({ type: 'CURRENT_USER' , payload: res.data})
    Cookies.set('user' , res.data.id)
}



export const verifyUserViaCookie = (cookie) => async dispatch => {
    const res = await axios.post('/api/user/cookie',  {cookie} )
    console.log('res coming from cookie verification')
    dispatch({ type: 'CURRENT_USER' , payload: res.data})
      //when user is already logged in, this will just verify the cookie
}
