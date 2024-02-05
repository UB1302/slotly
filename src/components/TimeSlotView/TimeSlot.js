import styles from "./timeSlot.module.css"

const TimeSlot = ({timeStampObj,handleTimeSlotSelection}) => {

    if(timeStampObj.isSelected){
        return (
            <div className={styles["time-slot-selected"]} onClick={() => handleTimeSlotSelection(timeStampObj.startDateTimeStamp)}>
                <div className={styles["time-slot-container-selected"]}>
                    {`${timeStampObj.startTime} - ${timeStampObj.endTime}`}
                </div>
                <div>tick</div>
            </div>
        )
    }else{
        return (
            <div className={styles["time-slot"]}  onClick={() => handleTimeSlotSelection(timeStampObj.startDateTimeStamp)}>
                <div className={styles["time-slot-container"]}>
                    {`${timeStampObj.startTime} - ${timeStampObj.endTime}`}
                </div>
            </div>
        )
    }
   
}

export default TimeSlot