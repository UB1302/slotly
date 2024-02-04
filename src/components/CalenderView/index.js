import styles from "./calenderView.module.css";
import CalenderComponent from "./CalenderComponent";
import TimeSlotView from "../TimeSlotView";
import { useState } from "react";



const CalenderView = () => {

    const [selectedDate,setSelectedDate] = useState(new Date())


    const handleDateChange = (value) => {
        console.log(new Date())
        console.log(value)        
        setSelectedDate(value)
    }


    const getAvailableSlots = () => {
        try{
            const year = selectedDate.getFullYear()
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            
            console.log(formattedDate)

            let apiEndPoint = `https://app.appointo.me/scripttag/mock_timeslots?start_date=2024-01-20&end_date=2024-01-30`
        }catch(error){
            // if api break show some message 
        }
        
    }

    return (
        <div className={styles["calendar-container"]}>
            <div className={styles["split-view"]}>
                <div className={styles["view-1"]}>
                    <h3>Test Service</h3>
                    <h6>Timezone: Asia/Calcutta</h6>
                    <div>
                        <CalenderComponent selectedDate = {selectedDate} handleDateChange = {handleDateChange}/>
                    </div>
                </div>
                <div className={styles["view-2"]}>
                    <TimeSlotView/>
                </div>
            </div>
            <div className={styles["footer"]}>
                <div>POWERED BY APPOINTO</div>
                <div>
                    <button>
                        Next <span>&#62;</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CalenderView;
