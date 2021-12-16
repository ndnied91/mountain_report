import axios from 'axios'
import Cookies from 'js-cookie'

export const fetchAllMountains = () => async dispatch => {
  const res = await axios.get(`/api/mountains`)
   dispatch({ type: 'FETCH_MNTS' , payload: res.data})
}



export const fetchSelectedMountains = (values) => async dispatch => {
  const res = await axios.post('/api/mountains', values)
  dispatch({ type: 'FETCH_MNTS' , payload: res.data})
}



export const  moutainSelections= (selection) =>{
  return ({ type: 'ADD_ITEM' , payload : selection })
}



export const verifyUser = (values) => async dispatch => {
  let vals = {username: values.username.value, password: values.password.value}
    const res = await axios.post('/api/login', vals)
    dispatch({ type: 'CURRENT_USER' , payload: res.data})
          Cookies.set('username' , res.data)
  //get response from databse
}




export const saveUser = (values) => async dispatch => {
  let vals = {username: values.username.value, password: values.password.value}
    const res = await axios.post('/api/user', vals)
    dispatch({ type: 'CURRENT_USER' , payload: res.data})
    Cookies.set('username' , res.data)
}
