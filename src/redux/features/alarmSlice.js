import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alarms: []
};

export const alarmSlice = createSlice({
  name: "alarm",
  initialState,
  reducers: {
    addAlarm: (state, action) => {
      state.alarms.push(action.payload);   
    },

    deleteAlarm: (state, action) => {
        state.alarms = state.alarms.filter(
            alarm => alarm.id !== action.payload
        );  
    },

    toggleAlarm: (state, action) => {
      const alarm = state.alarms.find(
        a => a.id === action.payload
      );
      if (alarm) {
        alarm.isActive = !alarm.isActive;
      }
    },

    markAsPassed: (state, action) => {
      const alarm = state.alarms.find(
        a => a.id === action.payload
      );
      if (alarm) {
        alarm.status = "passed";
      }
    }
  }
});

export const { addAlarm, deleteAlarm, toggleAlarm, markAsPassed } = alarmSlice.actions;
export default alarmSlice.reducer;