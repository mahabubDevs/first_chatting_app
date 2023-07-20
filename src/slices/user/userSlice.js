import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'user',
    initialState: {
      loginUser: localStorage.getItem("user") ?JSON.parse(localStorage.getItem("user")):null ,
    },
    reducers: {
      userdata: (state,actions) => {
        console.log("ami reducer thake asaci" ,actions.payload)
        state.loginUser = actions.payload

      },
      
    }
  })
  

  export const {userdata} = counterSlice.actions
  
  export default counterSlice.reducer