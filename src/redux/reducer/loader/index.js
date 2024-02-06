import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: true
}

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        setLoader(state, action){
            return state = action.payload
        }
    }
})

export const {setLoader} = loaderSlice.actions;
export default loaderSlice.reducer