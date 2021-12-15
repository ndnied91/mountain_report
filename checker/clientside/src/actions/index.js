import axios from 'axios'


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



export const handleSubmit = (values) => async dispatch => {

  let vals = {username: values.username.value, password: values.password.value}
  console.log(vals)
  const res = await axios.post('/api/login', vals)
  //get response from databse
}
