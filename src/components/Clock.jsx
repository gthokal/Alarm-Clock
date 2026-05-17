import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); 
    return () => clearInterval(timer);
  }, []);

  const format = (num) => num.toString().padStart(2, "0");

  const hours = time.getHours();
  const formattedHour = hours % 12 || 12;
  const ampm = hours >= 12 ? "PM" : "AM";

  return (
    <>
      {/* <h2>Digital Clock</h2> */}
      <section className="wrap" id="clock">
        <div className="navbar">
          <h1>Clock</h1>
        </div>
        <div className="page">
          <div className="clock">
            {format(formattedHour)}:{format(time.getMinutes())}:{format(time.getSeconds())} {ampm}
            <small> 
                {
                    `${time.toLocaleDateString("en-GB", { weekday: "short" })} 
                    ${time.getDate().toString().padStart(2, "0")} 
                    ${time.toLocaleDateString("en-GB", { month: "short" })}, 
                    ${time.getFullYear()}`
                }
            </small>
          </div>
        </div>

        <div className="toolbar">
          <div className="toolbar-inner">
            <a className="link" onClick={() => navigate("/")}>Clock</a>
            <a className="link" onClick={() => navigate("/alarms")}>Alarm</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Clock;
