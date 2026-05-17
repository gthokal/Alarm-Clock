import { useSelector, useDispatch } from "react-redux";
import { toggleAlarm } from "../redux/features/alarmSlice";
import { useNavigate } from "react-router-dom";

const AlarmList = () =>{
    const alarms = useSelector(state => state.alarm.alarms);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sortedAlarms = [...alarms].sort((a, b) =>
        a.status === "upcoming" ? -1 : 1
    );

    const formatDays = (days) => {
        if (days.length === 7) return "Everyday";
        if (days.join(",") === "Mon,Tue,Wed,Thu,Fri") return "Weekdays";
        if (days.join(",") === "Sat,Sun") return "Weekend";
        return days.join(", ");
    };

    const formatTime = (time) => {
        const [hour, minute] = time.split(":");
        const hourNum = parseInt(hour);
        const ampm = hourNum >= 12 ? "PM" : "AM";
        const formattedHour = hourNum % 12 || 12;
        return `${formattedHour.toString().padStart(2, "0")}:${minute} ${ampm}`;
    };


    return(
        <>
            <section className="wrap" id="clock">
                <div className="navbar">
                    <a className="pills left editAlarms" onClick={() => navigate("/edit")}>Edit</a>
                    <h1>Alarm</h1>
                    <a className="pills right addAlarm" onClick={() => navigate("/add")}>Add</a>
                </div>

                <div className="page">
                    <div className="clock">
                        {sortedAlarms.length === 0 && (
                            <p>No Alarms set</p>
                        )}
                    </div>

                    <ul className="list">
                        {sortedAlarms.map((alarm) => {
                            return (
                                <li
                                    key={alarm.id}
                                    className={`item ${!alarm.isActive ? "off" : ""}`}
                                >
                                    <label className="item-link item-content">
                                        <a
                                            href="#"
                                            className="remove"
                                            onClick={(e) => {
                                            e.preventDefault();
                                            // dispatch(deleteAlarm(alarm.id))  // if you implement
                                            }}
                                        >
                                            X
                                        </a>

                                        {/* Toggle Checkbox */}
                                        <input
                                            type="checkbox"
                                            checked={alarm.isActive}
                                            onChange={() => dispatch(toggleAlarm(alarm.id))}
                                        />

                                        {/* Time */}
                                        <strong>{formatTime(alarm.time)}</strong>

                                        {/* Label + Days */}
                                        <small>
                                            {alarm.label}, {formatDays(alarm.days)}
                                        </small>
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                
                <div className="toolbar">
                    <div className="toolbar-inner">
                        <a className="link" onClick={() => navigate("/")}>Clock</a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AlarmList;
