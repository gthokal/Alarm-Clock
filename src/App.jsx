import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { markAsPassed } from "./redux/features/alarmSlice";

import Clock from "./components/Clock";
import AlarmList from "./components/AlarmList";
import AddAlarm from "./components/AddAlarm";
import EditAlarm from "./components/EditAlarm";
import PlayAlarm from "./components/PlayAlarm";
import './App.css'


function AlarmChecker() {
  const alarms = useSelector((state) => state.alarm.alarms);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);
      const currentDay = now.toLocaleString("en-US", { weekday: "long" });

      alarms.forEach((alarm) => {
        if (
          alarm.time === currentTime &&
          alarm.isActive &&
          alarm.status === "upcoming" &&
          alarm.days?.includes(currentDay)
        ) {
          dispatch(markAsPassed(alarm.id)); 
          navigate("/play", { state: alarm });
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [alarms, dispatch, navigate]);

  return null;
}

const App = () => {
    return(
        <BrowserRouter>
            <AlarmChecker /> 
            <Routes>
                <Route path="/" element={<Clock />} />
                <Route path="/alarms" element={<AlarmList />} />
                <Route path="/add" element={<AddAlarm />} />
                <Route path="/edit" element={<EditAlarm />} />
                <Route path="/edit/:id" element={<AddAlarm />} />
                <Route path="/play" element={<PlayAlarm />} />
            </Routes>
        </BrowserRouter>
    )

};

export default App;
