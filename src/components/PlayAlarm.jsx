import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleAlarm, markAsPassed } from "../redux/features/alarmSlice";
import beep from "../assets/beep-sound.mp3";
import radar from "../assets/radar-sound.mp3";

import { useLocation, useNavigate } from "react-router-dom";

const PlayAlarm = () => {
  const location = useLocation();
  const alarm = location.state;   // ALARM HERE
  const audioRef = useRef(null);
  const [time, setTime] = useState(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!alarm) return null;

  // Live Clock
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Start Alarm Sound
  useEffect(() => {
    let selectedSound;

    if (alarm.sound === "Beep") {
      selectedSound = beep;
    } else if (alarm.sound === "Radar") {
      selectedSound = radar;
    } else {
      return; 
    }
    audioRef.current = new Audio(selectedSound);
    audioRef.current.loop = true;
    audioRef.current.play().catch(err =>
      console.log("Autoplay blocked:", err)
    );

    return () => {
      audioRef.current.pause();
    };
  }, [alarm.sound]);

  // Stop Alarm
  const stopAlarm = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    dispatch(markAsPassed(alarm.id));
    dispatch(toggleAlarm(alarm.id)); // optional

    navigate("/");
  };

  

  // Snooze (5 minutes)
  const snoozeAlarm = () => {
    audioRef.current.pause();

    setTimeout(() => {
      audioRef.current.play();
    }, 5 * 60 * 1000); // 5 minutes
  };

  return (
    <section className="wrap">
      <div className="page alarm">
        <div className="clock">
          {time.toLocaleTimeString()}
          <small>{time.toDateString()}</small>
          <p>{alarm.label}</p>
        </div>

        <div className="action">
          <a className="button" onClick={snoozeAlarm}>
            Snooze
          </a>
          <a className="button small" onClick={stopAlarm}>
            Stop
          </a>
        </div>
      </div>
    </section>
  );
};

export default PlayAlarm;