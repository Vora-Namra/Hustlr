
import {createSlice} from "@reduxjs/toolkit";
import { updateProfile } from "../Services/ProfileService";

const profileSlice= createSlice({
    name:"profile",
    initialState:{},
    reducers:{
        changeProfile:(state,action)=>{
            state=updateProfile(action.payload);
            return action.payload;
        },
        setProfile:(state,action)=>{
            state=action.payload;
            return state;
        }
    }
    
});

export const {changeProfile,setProfile}=profileSlice.actions;
export default profileSlice.reducer;
// import { createSlice } from "@reduxjs/toolkit";

// const profileSlice = createSlice({
//   name: "profile",
//   initialState: {},
//   reducers: {
//     // Remove the async call from changeProfile. Just update state.
//     changeProfile: (state, action) => {
//       return action.payload;
//     },
//     setProfile: (state, action) => {
//       return action.payload;
//     }
//   }
// });

// export const { changeProfile, setProfile } = profileSlice.actions;
// export default profileSlice.reducer;
