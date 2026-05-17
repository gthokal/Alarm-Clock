import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAlarm, toggleAlarm } from "../redux/features/alarmSlice";

const EditAlarm = () => {
    const alarms = useSelector((state) => state.alarm.alarms);
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

    return (
        <section className="wrap" id="alarmList">
            <div className="navbar">
                <a className="pills left" onClick={() => navigate("/alarms")}>Done</a>
                <h1>Edit Alarm</h1> 
            </div>
            <div className="page">
                <ul className="list">
                    {alarms.map((alarm) => (
                        <li
                        key={alarm.id}
                        className={`item edit ${alarm.active === false ? "off" : ""}`}
                        >
                            {/* ❌ DELETE BUTTON */}
                            <a
                                className="remove"
                                onClick={() => dispatch(deleteAlarm(alarm.id))}
                            >x</a>

                            {/* CLICK TO EDIT */}
                            <label
                                className="item-link item-content"
                                onClick={() => navigate(`/edit/${alarm.id}`)}
                            >
                                <input
                                type="checkbox"
                                checked={alarm.active}
                                onChange={() => dispatch(toggleAlarm(alarm.id))}
                                onClick={(e) => e.stopPropagation()} 
                                />

                                {/* Time */}
                                <strong>{formatTime(alarm.time)}</strong>

                                {/* Label + Days */}
                                <small>
                                    {alarm.label}, {formatDays(alarm.days)}
                                </small>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default EditAlarm;