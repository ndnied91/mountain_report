import axios from 'axios'


export const fetchAllMountains = () => async dispatch => {
  const res = await axios.get(`/api/mountains`)
   console.log(res)
   dispatch({ type: 'FETCH_ALL_MNTS' , payload: res.data})
}
