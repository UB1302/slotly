import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from "./calenderComponent.module.css"

const CalenderComponent = ({selectedDate,handleDateChange}) => {
    return (
        <div>
            <Calendar onChange={handleDateChange} value={selectedDate}/>
        </div>
    )
}

export default CalenderComponent