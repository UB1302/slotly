import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./calenderComponent.module.css";

const CalenderComponent = ({ selectedDate, handleDateChange,setSelectedDate }) => {
 
    return (
        <div className={styles["calendar-container"]}>
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                next2Label={null}
                prev2Label={null}                
                onActiveStartDateChange = {(values)=>setSelectedDate(values.activeStartDate)}
            />
        </div>
    );
};

export default CalenderComponent;
