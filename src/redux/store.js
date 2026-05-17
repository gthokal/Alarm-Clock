import {configureStore} from "@reduxjs/toolkit"
import alarmReducer from "./features/alarmSlice"

export const store = configureStore({
    reducer:{
        alarm: alarmReducer
    },
})

