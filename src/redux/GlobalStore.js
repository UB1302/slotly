import { configureStore } from "@reduxjs/toolkit";
import loader from './reducer/loader/index'


const reduxStore = configureStore({
    reducer: {
        loaderReducer: loader       
    }
})

export default reduxStore;