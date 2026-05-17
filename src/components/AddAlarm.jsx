import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAlarm, deleteAlarm } from "../redux/features/alarmSlice";
import { useNavigate, useParams } from "react-router-dom";

const AddAlarm = () => {
  const { id } = useParams();
  const alarms = useSelector((state) => state.alarm.alarms);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hour, setHour] = useState("HH");
  const [minute, setMinute] = useState("MM");
  const [ampm, setAmpm] = useState("AM");
  const [snooze, setSnooze] = useState(true);
  const [label, setLabel] = useState("");
  const [days, setDays] = useState([]);
  const [sound, setSound] = useState("None");

  const daysList = [
    "Monday","Tuesday","Wednesday",
    "Thursday","Friday","Saturday","Sunday"
  ];

  const existingAlarm = alarms.find(
    (a) => a.id === Number(id)
  );

  useEffect(() => {
    if (existingAlarm) {
      const [h, m] = existingAlarm.time.split(":");

      let hour12 = parseInt(h);
      let ampmValue = "AM";

      if (hour12 >= 12) {
        ampmValue = "PM";
        if (hour12 > 12) hour12 -= 12;
      }
      if (hour12 === 0) hour12 = 12;

      setHour(hour12.toString().padStart(2, "0"));
      setMinute(m);
      setAmpm(ampmValue);
      setSnooze(existingAlarm.snooze);
      setLabel(existingAlarm.label);
      setDays(existingAlarm.days || []);
      setSound(existingAlarm.sound || "None");
    }
  }, [existingAlarm]);

  

  const toggleDay = (day) => {
    if (days.includes(day)) {
      setDays(days.filter(d => d !== day));
    } else {
      setDays([...days, day]);
    }
  };

  const handleSave = () => {
    // Convert to 24hr format
    let hour24 = parseInt(hour);
    if (ampm === "PM" && hour24 !== 12) hour24 += 12;
    if (ampm === "AM" && hour24 === 12) hour24 = 0;

    const formattedTime = `${hour24
      .toString()
      .padStart(2, "0")}:${minute}`;

    // const newAlarm = {
    //   id: Date.now(),
    //   time: formattedTime,
    //   label: label || "Alarm",
    //   days,
    //   snooze,
    //   sound,
    //   isActive: true,
    //   status: "upcoming"
    // };

    const newAlarm = {
      id: existingAlarm ? existingAlarm.id : Date.now(),
      time: formattedTime,
      label: label || "Alarm",
      days,
      snooze,
      sound,
      isActive: true,
      status: "upcoming"
    };

    if (existingAlarm) {
      dispatch(deleteAlarm(existingAlarm.id));
    }

    dispatch(addAlarm(newAlarm));
    navigate("/alarms");
  };

  return (
    <section className="wrap" id="AddEdit">
      <div className="navbar">
        <a
          className="pills left cancel"
          onClick={() => navigate("/alarms")}
        >
          Cancel
        </a>

        <h1>Add Alarm</h1>

        <a
          className="pills right save"
          onClick={handleSave}
        >
          Save
        </a>
      </div>

      <div className="page">

        {/* TIME */}
        <div className="content-block-title">Select Time</div>
        <div className="content-block-inner">
          <p>
            <select value={hour} onChange={(e) => setHour(e.target.value)}>
              <option value="HH">HH</option>
              {[...Array(12)].map((_, i) => {
                const val = (i + 1).toString().padStart(2, "0");
                return <option key={val}>{val}</option>;
              })}
            </select>

            <select value={minute} onChange={(e) => setMinute(e.target.value)}>
              <option value="MM">MM</option>
              {[...Array(60)].map((_, i) => {
                const val = i.toString().padStart(2, "0");
                return <option key={val}>{val}</option>;
              })}
            </select>

            <select value={ampm} onChange={(e) => setAmpm(e.target.value)}>
              <option>AM</option>
              <option>PM</option>
            </select>
          </p>

          {/* Snooze */}
          <p className="item select">
            <label>
              <input
                type="checkbox"
                checked={snooze}
                onChange={() => setSnooze(!snooze)}
              />
              <span>Snooze</span>
            </label>
          </p>

          {/* Label */}
          <p className="item select">
            <label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
              <span>Label</span>
            </label>
          </p>
        </div>

        {/* REPEAT */}
        <div className="content-block-title">Repeat</div>
        <ul className="list">
          {daysList.map(day => (
            <li key={day} className="item select">
              <label>
                <input
                  type="checkbox"
                  checked={days.includes(day)}
                  onChange={() => toggleDay(day)}
                />
                <span>{day}</span>
              </label>
            </li>
          ))}
        </ul>

        {/* SOUND */}
        <div className="content-block-title">Sound</div>
        <ul className="list">
          {["None", "Radar", "Beep"].map(s => (
            <li key={s} className="item select">
              <label>
                <input
                  type="radio"
                  name="sound"
                  checked={sound === s}
                  onChange={() => setSound(s)}
                />
                <span>{s}</span>
              </label>
            </li>
          ))}
        </ul>


      </div>

      <div className="action">
        <a
            className="button open-panel"
            onClick={handleSave}
        >
          Save Alarm
        </a>

        {existingAlarm && (
          <a
            className="button open-panel danger"
            onClick={() => {
              dispatch(deleteAlarm(existingAlarm.id));
              navigate("/alarms");
            }}
          >
            Delete Alarm
          </a>
        )}
      </div>
    </section>
  );
};

export default AddAlarm;